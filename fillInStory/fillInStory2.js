var out = '';
var blanks = [];

/* This function looks at a string. If it containes a fillIn value, two items are added
    to the currentStory array, a FillIn object and the remainder of the string.
    Otherwise, the line is added to currentStory array. 

     (e.g., 'person} and ' adds {person: ''} and ' and ' to currentStory array
     ' and a great time was had.' adds the line to currentStory

*/
function findFillIn() {
  var story = $('#inputStory').val();
  var splitStr = '';
  var i = 1; // counter for blank names
  var newName;
  var storyLines = story.split('{');
  var s;
  var slen = storyLines.length;

  for (i = 0; i < slen; i += 1) {
    if (i === 0) {
      out = storyLines[i];
    } else {
      s = storyLines[i];
      // does line has a right curly, indexOf returns -1 if not found
      if (s.indexOf('}') > 0) {
        splitStr = s.split('}');
        newName = splitStr[0] + i;
        // push an object and then the rest of the string
        out += '{' + newName + '}' + splitStr[1];
        blanks.push({
          type: splitStr[0],
          value: '',
          name: newName
        });
      } else {
        out += s;
      }
    }
  }
  show();
}

var show = function () {
  blanks.forEach(function (item) {
    $('div#outputStory').append('<label><b>' + item.type + '</b>:</label> <input name="' + item.name + '" id="' + item.name + '" value=""><br />')
  })
};

var collect = function () {
  blanks.forEach(function (item) {
    item.value = $('#' + item.name).val();
  })
  console.log(blanks);
};

var fill = function () {
  var story = out;
  var splitStr = '';
  var i;
  var newName;
  var storyLines = story.split('{');
  var s;
  var slen = storyLines.length;
  var mapBlank = {};

  blanks.forEach(function (item) {
    mapBlank[item.name] = item.value;
  });
  for (i = 0; i < slen; i += 1) {
    if (i === 0) {
      out = storyLines[i];
    } else {

      s = storyLines[i];
      // does line has a right curly, indexOf returns -1 if not found
      if (s.indexOf('}') > 0) {
        splitStr = s.split('}');
        newName = splitStr[0];
        out += mapBlank[newName] + splitStr[1];
      } else {
        out += s;
      }
    }
  }
  return out;
};

var process = function () {
  var final = '';

  collect();
  final = fill();
  $('#final').html(final);
};