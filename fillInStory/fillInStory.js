//const readline = require('readline');
//
//const rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
//});
//
//console.log('readline rl: ' + rl);
//console.log('readline.input: ', readline.input);
//rl.question('Input story name: ', (storyName) => {
//  console.log('Story: ' + storyName + ' to begin soon.');
//  rl.close();
//});

const readline = require('readline');

//const rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
//});

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

//console.log(story);
storyLines = story.split('{');
//console.log(storyLines);
//console.log(storyLines[0]);
//currentStory.push(storyLines[0]);
//console.log(currentStory);


function printLine(s) {
  console.log(s);
}

function FillIn(s) {
  this.fillType = s;
  this.value = '';
}

function findFillIn(s) {
  /* This function looks a string. If it containes a fillIn value, two items are added to
      the currentStory, an object with an item and a value, and the remainder of the string.
      Otherwise, the line is added to currentStory. 
       
       (e.g., 'person} and '  adds {person: ''} and ' and ' to currentStory
       ' and a great time was had.' adds the line to currentStory

  */
  //  var beforeRCurly = /(\w+)\}/;
  //  
  //  var match = beforeRCurly.exec(s);
  //  console.log(match);

  var splitStr = '';

  //  console.log(s);
  if (s.indexOf('}') > 0) { // does line has a right curly, indexOf returns -1 if not found
    splitStr = s.split('}');
    //    console.log(splitStr);
    // push an object and then the rest of the string
    currentStory.push(new FillIn(splitStr[0]), splitStr[1]);
  } else {
    currentStory.push(s);
  }
  //  console.log(currentStory);
}

//storyLines.forEach(function(s) {
//  console.log(s);
//});

// storyLines.forEach(printLine);

function setFillInx(line) {
  var rl;
  console.log('line: ' + line + ' type: ' + typeof line);
  if (typeof line !== 'string') {
    // console.log('fillin ' + line.fillType);
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Input ' + line.fillType, (inputValue) => {
      // TODO: Log the answer in a database
      line.value = inputValue;
      console.log(line.fillType + lineValue);
      //rl.close();
      //process.exit();
    });
  }
}

var setFillIn = function sfi(lines) {
  var i = 0;
  var noOfLines = lines.length;
  var rl = readline.createInterface(process.stdin, process.stdout);

  // Skip over input until a FillIn object is found
  while (typeof lines[i] === 'string') {
    i += 1;
  }

  // Prompt user for an specific type of input
  console.log(i, lines[i].fillType + ' >');
  i += 1;
  rl.on('line', function (line) {
      // Accept user input
      console.log('You typed: ' + line);
      // line.value = line;
      lines[i - 1].value = line;
      console.log('line: ', lines[i - 1]);
      while (typeof lines[i] === 'string') {
        //if (i === noOfLines) rl.close();
        i += 1;
        if (i >= noOfLines) {
          console.log('Close readline 1');
          rl.close();
        }
      }
      if (i >= noOfLines) {
        console.log('Close readline 2');
        rl.close();
      }
      console.log(i, lines[i].fillType + ' >');
      i += 1;
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
    printableStory = printableStory + line;
  } else {
    printableStory = printableStory + line.value;
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