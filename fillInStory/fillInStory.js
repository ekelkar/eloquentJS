const readline = require('readline');
// const rl = readline.createInterface(process.stdin, process.stdout);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//rl.question('Input story name? ', (storyName) => {
//  // TODO: Log the answer in a database
//  console.log(storyName + ' to be published shortly');
//
//  //rl.close();
//  process.exit();
//});

//rl.on('line', (input) => {
//  console.log(`Received: ${input}`);
//});

var story = "I went to the Maker Faire Atlanta with {person} and {person}. " +
  "While there I saw {adjective} science {noun}, {adjective} robots, and " +
  "{adjective} craft {noun}. " +
  "At the {place}, I took a break and ate a {food item} and drank {liquid}."

var storyLines = '';
var currentStory = [];
var printableStory = '';

storyLines = story.split('{');

function printLine(s) {
  console.log(s);
}

/* Construct a FillIn object with the fields
     fillType - type of input wanted
     value    - value input
*/
function FillIn(s) {
  this.fillType = s;
  this.value = '';
}

/* This function looks at a string. If it containes a fillIn value, two items are added
    to the currentStory array, a FillIn object and the remainder of the string.
    Otherwise, the line is added to currentStory array. 

     (e.g., 'person} and ' adds {person: ''} and ' and ' to currentStory array
     ' and a great time was had.' adds the line to currentStory

*/
function findFillIn(s) {

  var splitStr = '';

  // does line has a right curly, indexOf returns -1 if not found
  if (s.indexOf('}') > 0) {
    splitStr = s.split('}');
    // push an object and then the rest of the string
    currentStory.push(new FillIn(splitStr[0]), splitStr[1]);
  } else {
    currentStory.push(s);
  }
}


var setFillIn = function sfi(lines) {
  var i = 0;
  var noOfLines = lines.length;

  // Skip over input until a FillIn object is found
  while (typeof lines[i] === 'string') {
    i += 1;
  }

  // Prompt user for input
  console.log(i, lines[i].fillType + ' >');
  // i += 1;
  rl.on('line', function (line) {
      // Accept user input
      console.log('You typed: ' + line);
      // line.value = line;
      lines[i].value = line;
      console.log('line: ', lines[i]);
      i += 1;

      // Skip over input until a FillIn object is found
      while (typeof lines[i] === 'string') {
        i += 1;
        //        if (i >= noOfLines) {
        //          console.log('Close readline 1');
        //          rl.close();
        //        }
      }
      if (i >= noOfLines) {
        console.log('Close readline 2');
        rl.close();
      }
      // Prompt user for input
      console.log(i, lines[i].fillType + ' >');
      // i += 1;
    })
    .on('close', function () {

      // do rest of the processing here
      console.log('Handling close');
      console.log(currentStory);
      printStory();
      process.exit(0);

    });
};

var addToStory = function ats(line) {
  if (typeof line === 'string') {
    printableStory += line;
  } else {
    printableStory += line.value;
  }
};

var printStory = function ps() {
  currentStory.forEach(addToStory);
  console.log(printableStory);
};

storyLines.forEach(findFillIn);
console.log(currentStory);
//currentStory.forEach(setFillIn);
setFillIn(currentStory);