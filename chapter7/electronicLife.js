// In the plan for this world, 
//
//   '#' represent walls and rocks
//   'o' represent critters
//   empty spaces represent empty spaces

var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

// Vector objects are used to represent each space in the grid
// representing the world.

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

// Objects move by vector arithmetic, negative number move down and left 
Vector.prototype.plus = function(other) {
  // This acts on a vector, so the original vector is changed. 
  //    Make sure to use a new Vector if you want to maintain original.
  return new Vector(this.x + other.x, this.y + other.y);
}

// The grid object representing the world is implemented as a single array of size
// width * height.
// Value are accessed by taking the location vector multiplying the 'y'
// value by the width of the grid and adding the 'x' value.

// Sample 5x4 grid

//              -------------------------------
//           0  |  0  |  1  |  2  |  3  |  4  |
//              |(0,0)|(1,0)|(2,0)|(3,0)|(4,0)|
//              -------------------------------
//           1  |  5  |  6  |  7  |  8  |  9  |
//              |(0,1)|(1,1)|(2,1)|(3,1)|(4,1)|
//              -------------------------------
//           2  | 10  | 11  | 12  | 13  | 14  |
//              |(0,2)|(1,2)|(2,2)|(3,2)|(4,2)|
//              -------------------------------             
//           3  | 15  | 16  | 17  | 18  | 19  |
//              |(0,3)|(1,3)|(2,3)|(3,3)|(4,3)|
//              -------------------------------
//                 0     1     2     3     4
             
function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}

Grid.prototype.isInside = function(vector) {
  if ((vector.x >= 0 && vector.x < this.width) &&
      (vector.y >= 0 && vector.y < this.height)) {
    return true;
  }
  return false;
};

Grid.prototype.get = function(vector) {
//  console.log('vector:', vector);
//  console.log('get space:', this.width * vector.y + vector.x);
  return this.space[this.width * vector.y + vector.x];
};

Grid.prototype.set = function(vector, value) {
//  console.log('vector:', vector);
//  console.log('set space:', this.width * vector.y + vector.x);
  this.space[this.width * vector.y + vector.x] = value;
};

// The following specialized grid forEach function specifies a context
//    parameter by using the call method to call a function with a context
Grid.prototype.forEach = function(f, context) {
  // Loop over each vector in the grid
  for (var y = 0; y < this.height; y += 1) {
    for (var x = 0; x < this.width; x += 1) {
      // Find out what is located in a grid vector
      var value = this.space[x + y * this.width];
      // For ever vector with an valid object in the location
      //   somehow calling a function with this context???
      if (value != null) {
        f.call(context, value, new Vector(x, y));
      }
    }
  }
};
      

// Use the directions object to map direction names into coordinate offsets.
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
}; 

// Pick a random array element
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Create an array of direction names
var directionNames = "n ne e se s sw w nw".split(" ");
// console.log('directionNames:', directionNames);


// The following function converts a direction and number into a new direction
// Input: 
//   dir - a character string indicating a direction (e.g., "n", "se") 
//   n   - a number n indicating how many 45-degree turns to make
//         A positive n means the critter is moving in a clockwise direction
//         A negative n means the critter is moving in a counter clockwise direction
// Returns:
//   a character string representing the new direction (e.g., "s", "nw")

function dirPlus (dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

// Create a critter that has direction
function BouncingCritter() {
  this.direction = randomElement(directionNames);
}

BouncingCritter.prototype.act = function(view) {
  // Look at the grid square in the direction this critter has set
  // If this is not a blank space, set the direction to a spot that has a 
  // blank space or "s" as default.
  if (view.look(this.direction) != " ") {
    this.direction = view.find(" ") || "s";
  }
  return {type: "move", direction: this.direction};
};

// Another type of critter in this world is the WallFlower who starts out looking 
//   south.
function WallFollower() {
  this.dir = "s";
}

WallFollower.prototype.act = function (view) {
  var start = this.dir;
  // If there is a wall or another animal, turn to face the wall
  if (view.look(dirPlus(this.dir, -3)) != " ") {
      start = this.dir = dirPlus(this.dir, -2);
    }
  // Continue looking for the next non-empty space
  while (view.look(this.dir) != " ") {
      this.dir = dirPlus(this.dir, 1);
      if (this.dir == start) {
        break;
      }
  }
  return {type: "move", direction: this.dir};
};

// A wall is a simple object that takes up space but has no act method
function Wall() {
}

// A plant oblect is created with energy between 3 and 7
function Plant() {
  this.energy = 3 + Math.random() * 4;
}

// Plants with greater than 15 energy can reproduce into an empty space.
// Plants grow until they reach energy 20.

Plant.prototype.act = function(view) {
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space) {
      return {type: "reproduce", direction: space};
    }
    if (this.energy < 20) {
     return {type: "grow"}; 
    }
  }
};

// A plant eater is an object, Its initial energy is 20.

function PlantEater() {
 this.energy = 20;
}

PlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  var plant = view.find("*");
  
  if (this.energy > 60 && space) {
    return {type: "reproduce", direction: space}; 
  }
  if (plant) {
   return {type: "eat", direction: plant}; 
  }
  if (space) {
   return {type: "move", direction: space}; 
  }
};

// Using the legend, create new objects of the appropriate type, remember the
// originChar so this can be displayed when printing.

function elementFromChar(legend, ch) {
  if (ch == " ") {
    // Blank spaces are represented by null objects
    return null;
  }
  var element = new legend[ch]();
//  console.log("Created element:", legend[ch]);
  
  // Add the originChar field to objects created above
  element.originChar = ch;
  return element;
}

// To aid printing, convert an object to its original character
function charFromElement(element) {
  if (element == null) {
    return " ";
  } else {
    return element.originChar;
  }
}
  
  

// Use the input map (i.e., an array of lines) to create a grid of the world
function World(map, legend) {
  
//  console.log("legend:", legend);
  // The width of the grid is the width of the first line. The height of the 
  // grid is the number of lines.
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;
  
  // For each line in the input map
  map.forEach(function(line, y) {
    // For each character in the line, create a new vector and sets it value to
    // be ' ' or the specified object from legend
    for (var x = 0; x < line.length; x += 1) {
      grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
    }
  });
}
  
World.prototype.toString = function() {
  var output = "";
  var noCritters = 0;
  for (var y = 0; y < this.grid.height; y += 1) {
    for (var x = 0; x < this.grid.width; x += 1) {
      var element = this.grid.get(new Vector(x, y));
//      console.log(typeof(element));
      output += charFromElement(element);
    }
    output = output += '\n';
  }
  return output;
};

World.prototype.turn = function() {
  var acted = [];    // Keep an array of critters that have acted this turn
  this.grid.forEach(function(critter, vector) {
    // if the critter has an act method and has not already acted
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

World.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  // Check that an action is set and that the action is "move".
  // "move" is the only valid action in the world.
  if (action && action.type == "move") {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      // If there is a dest and nothing is there. Set the current location to
      //    null and move the critter to the dest.
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
      var dest = vector.plus(directions[action.direction]);
      if (this.grid.isInside(dest)) {
        return dest;
      }
    }
};

// A LifeLikeWorld is a world build on top of the existing World.

function LifeLikeWorld(map, legend) {
  World.call(this, map, legend);
}

LifeLikeWorld.prototype = Object.create(World.prototype);

// The actionTypes object stores the functions called by the letAct method
// based on the type of work an object is performing.
 
var actionTypes = Object.create(null);

LifeLikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action &&
      action.type in actionTypes &&
      actionTypes[action.type].call(this, critter, vector, action);
  
  // If no action is performed, reduce energy by 0.2.
  //   Then if the critter's energy is < 0, remove it from the grid.
  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0) {
      this.grid.set(vector, null); 
    }
  }
};

actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

// The critter can move it its destination is not null, 
// its enegry is greater than 1, and there is nothing in
// the dest it wants to move into.

actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 1 ||
      this.grid.get(dest) != null) {
    return false;
  }
  // Moving reduces a creature energy by one. Make the creature's
  // current location null and move the critter to the destination
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

// A critter can eat an adjacent square but does not move into that 
// space.
actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.reproduce = function(critter, vector, action) {
  var baby = elementFromChar(this.legend, critter.originChar);
  var dest = this.checkDestination(action, vector);
  
  if (dest == null || critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null) {
   return false; 
  }
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};
  


// A view object looks at a world from the set vector which is the location of
// a critter. This gives the critter's view of the world
function View(world, vector) {
  this.world = world;
  this.vector = vector;
}

// The following is the version of look I implemented 

// Look checks the world from the vector
//   Returns: 
//     the character representing the object in the given direction or
//     'Invalid direction' if the direction is outside the world

//View.prototype.look = function(direction) {
//  // Use a tempVector to avoid changing original vector
//  var tempVector = new Vector(this.vector.x, this.vector.y);
//  var checkLocation = tempVector.plus(directions[direction]);
//  var valid = this.world.grid.isInside(checkLocation);
//  if (valid) {
//    return charFromElement(this.world.grid.get(checkLocation));
//  } else {
//    return ('Invalid direction');
//  }
//  
//  console.log("Check location:", checkLocation, "value: ",
//              this.world.grid.get(checkLocation));
//  return charFromElement(this.world.grid.get(checkLocation));
// };

// look checks the world from the vector 
//   Returns: 
//     the character representing the object in the given direction or
//     "#" character which represent a wall if the direction is outside the world
//           A critter cannot move where a wall is, so this prevents the critter
//             from attempting to move outside the world.

View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  
  if (this.world.grid.isInside(target)) {
    return charFromElement(this.world.grid.get(target)); 
  } else {
   return "#"; 
  }
};

// The following find and findall I implemented 
// find takes a map character as an argument. 
//   Returns: 
//      a direction in which the character can be found next to the critter or 
//      null if no such direction exists

//View.prototype.find = function(charToFind) {
////  console.log("finding: ", charToFind);
////  console.log("vector to start:", this.vector);
////  console.log("directions:");
//  
//  // ForEach continues for all values even if you want to return
//  
//  var foundDirection = null;
//  directionNames.forEach(function(direction) {
//    if (foundDirection) {
//      return;
//    }
//    var tempVector = this.vector;
//    var vectorToCheck = tempVector.plus(directions[direction]);
////    console.log("Check vector:", vectorToCheck);
//    if (this.world.grid.isInside(vectorToCheck)) {
////      console.log(direction);
//      if (charFromElement(this.world.grid.get(vectorToCheck)) === charToFind) {
////        console.log("found: " + direction);
//        foundDirection = direction;
//      } 
//    }
//  }, this);
//  return foundDirection;
//};

// findall takes a map character as an argument. 
//   Returns: 
//      an array of directions in which the character can be found next to the critter or 
//      an empty array if character not found in the critter's view

//View.prototype.findall = function(charToFind) {
////  console.log("finding all: ", charToFind);
////  console.log("vector to start:", this.vector);
////  console.log("directions:");
//  
//  // ForEach continues for all values even if you want to return
//  
//  var foundDirections = [];
//  foundDirections = directionNames.filter(function(direction) {
//    var tempVector = this.vector;
//    var vectorToCheck = tempVector.plus(directions[direction]);
////    console.log("Check vector:", vectorToCheck);
//    if (this.world.grid.isInside(vectorToCheck)) {
////      console.log(direction);
//      return charFromElement(this.world.grid.get(vectorToCheck)) === charToFind 
//    }
//  }, this);
////  console.log("Foundall directions: ", foundDirections);
//  return foundDirections;
//};

// findall takes a map character as an argument. 
//   Returns: 
//      an array of directions in which the character can be found next to the critter or 
//      an empty array if character not found in the critter's view

View.prototype.findAll = function(ch) {
  var found = [];
  
  // Check each direction for the given character, add direction to found array
  // if seen.
  for (var dir in directions) {
    if (this.look(dir) == ch) {
      found.push(dir); 
    }
  }
  return found;
};

// find takes a map character as an argument. 
//   Returns: 
//      a random direction in which the character can be found next to the location or 
//      null if no such direction exists

View.prototype.find = function (ch) {
  var found = this.findAll(ch);
  
  if (found.length == 0) {
   return null; 
  }
  return randomElement(found);
};
  
var grid5x4 = new Grid(5,4);
for (var y = 0; y < 4; y += 1) {
  for (var x = 0; x < 5; x += 1) {
    console.log('(', x, ',', y, ')', 'in grid:', grid5x4.isInside(new Vector(x, y)));
  }
}

console.log('(6,3) in grid:', grid5x4.isInside(new Vector(6,3)));
console.log('(3,5) in grid:', grid5x4.isInside(new Vector(3,5)));
console.log('value of (2,1):', grid5x4.get(new Vector(2,1)));
grid5x4.set(new Vector(2,1), 57);
console.log('value of (2,1):', grid5x4.get(new Vector(2,1)));

var legend = {"#": Wall,
              "o": BouncingCritter,
              "~": WallFollower
             };



var world = new World(plan, legend);
console.log(world.toString());

var testVector = new Vector(6,3);
var view = new View(world, testVector);
console.log("Start vector: ", testVector);
directionNames.forEach(function(direction) {
  console.log(direction  + ": '" + view.look(direction) + "'");
});

// console.log("From", testVector + "looking s: '" + view.look("s") + "'");
console.log(view.find("#"));
console.log(view.findAll("#"));

for (var i = 0; i < 5; i++) {
  world.turn();
  console.log(world.toString());
}

var wallFollowerPlan = ["############",
                        "#     #    #",
                        "#   ~    ~ #",
                        "#  ##      #",
                        "#  ##  o####",
                        "#          #",
                        "############"];

var wallFollowerWorld = new World(wallFollowerPlan, legend);
console.log(wallFollowerWorld.toString());

for (var i = 0; i < 10; i += 1) {
  wallFollowerWorld.turn();
  console.log(wallFollowerWorld.toString());
}

var valleyPlan = ["############################",
                  "#####                 ######",
                  "##   ***                **##",
                  "#   *##**         **  O  *##",
                  "#    ***     O    ##**    *#",
                  "#       O         ##***    #",
                  "#                 ##**     #",
                  "#   O       #*             #",
                  "#*          #**       O    #",
                  "#***        ##**    O    **#",
                  "##****     ###***       *###",
                  "############################"];

var valleyLegend = {"#": Wall,
                    "O": PlantEater,
                    "*": Plant};

var valley = new LifeLikeWorld(valleyPlan, valleyLegend);

console.log(valley.toString());
for (var i = 0; i < 10; i += 1) {
  valley.turn();
  console.log(valley.toString());
}
