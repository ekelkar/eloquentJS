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
//              |(0,1)|(1,2)|(2,1)|(3,1)|(4,1)|
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
console.log('directionNames:', directionNames);

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

// A wall is a simple object that takes up space but has no act method
function Wall() {
}
// Using the legend, create new objects of the appropriate type, remember the
// originChar so this can be displayed when printing.

function elementFromChar(legend, ch) {
  if (ch == " ") {
    // Blank spaces are represented by null objects
    return null;
  }
  var element = new legend[ch]();
  console.log("Created element:", legend[ch]);
  
  // Add the originChar field to objects created above
  element.originChar = ch;
  return element;
}

// To aid printing, convert an object to its original character
function charFromElement(element) {
  if (element == null) {
    return " ";
  } else {
    console.log("Not a null element:", element);
    return element.originChar;
  }
}
  
  

// Use the input map (i.e., an array of lines) to create a grid of the world
function World(map, legend) {
  
  console.log("legend:", legend);
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
}
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
              "o": BouncingCritter};

var world = new World(plan, legend);
console.log(world.toString());


    

