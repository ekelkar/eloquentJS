var row, column = 0; // loop indexes
var text = 'test';
var div;
var trailArray = [];
var heading;

var GREEN = 'rgb(62, 210, 59)'; // chrome use rgb values instead of hex '#3ED23B';
var BLUE = 'rgb(48, 123, 200)'; // #307BC8
var YELLOW = 'rgb(231, 244, 90)'; // #E7F45A
var VIOLET = 'rgb(121, 62, 140)'; // #793E8C
var PINK = 'rgb(227, 57, 80)'; // #E33950
var RED = 'rgb(109, 19, 21)'; // #6D1315
var CLEAR = 'rgb(195, 195, 185)'; // #C3C3B9
var ORANGE = 'rgb(212, 120, 98)'; // '#D47862
var DEFAULT = 'rgb(43, 43, 43)'; // dark gray
var colors = [GREEN, BLUE, YELLOW, PINK, DEFAULT];

var SIZE = 20;
var boxdiv;
var halfboxdiv;
var body;
var dotdiv;
var cleardiv;
var dotdivs;
var elem;
var colorIndex;
var currentId = 0;

function addOddRow() {
    // add first half-box
    halfboxdiv = document.createElement('div');
    halfboxdiv.className = 'half-box';
    document.body.appendChild(halfboxdiv);

    for (column = 0; column < SIZE - 1; column += 1) {
        boxdiv = document.createElement('div');
        boxdiv.className = 'box';
        dotdiv = document.createElement('div');
        dotdiv.className = 'dot';
        dotdiv.id = 'dot' + currentId.toString();
        currentId += 1;
        // dotdiv.id = 'dot' + (row * SIZE + column).toString();
        boxdiv.appendChild(dotdiv);
        document.body.appendChild(boxdiv);
    }
    // add last half-box
    halfboxdiv = document.createElement('div');
    halfboxdiv.className = 'half-box';
    document.body.appendChild(halfboxdiv);
}

function addEvenRow() {
    for (column = 0; column < SIZE; column += 1) {
        boxdiv = document.createElement('div');
        boxdiv.className = 'box';
        dotdiv = document.createElement('div');
        dotdiv.className = 'dot';
        dotdiv.id = 'dot' + currentId.toString();
        currentId += 1;
        // dotdiv.id = 'dot' + (row * SIZE + column).toString();
        boxdiv.appendChild(dotdiv);
        document.body.appendChild(boxdiv);
    }
}

body = document.querySelector('body');
for (row = 0; row < SIZE; row += 1) {
    if (row % 2 === 0) {
        addEvenRow();

        //    for (column = 0; column < SIZE; column += 1) {
        //        boxdiv = document.createElement('div');
        //        boxdiv.className = 'box';
        //        dotdiv = document.createElement('div');
        //        dotdiv.className = 'dot';
        //        dotdiv.id = 'dot' + (row * SIZE + column).toString();
        //        boxdiv.appendChild(dotdiv);
        //        document.body.appendChild(boxdiv);
        //    }
    } else {
        addOddRow();
    }

    // clear the left float
    cleardiv = document.createElement('div');
    cleardiv.className = 'left-clear';
    document.body.appendChild(cleardiv);
}
dotdivs = document.getElementsByClassName('dot');
for (i = 0; i < dotdivs.length; i += 1) {
    dotdivs[i].addEventListener('click', function (event) {
        elem = document.getElementById(event.target.id);
        colorIndex = colors.indexOf(elem.style.backgroundColor);
        if (colorIndex < 0) {
            elem.style.backgroundColor = colors[0]; // set to first color if not in array, original
        } else {
            elem.style.backgroundColor = colors[(colorIndex + 1) % colors.length];
        }
    })
}