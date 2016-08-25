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

var BOXSIZE = 16; // size of each box in px
var MARGIN = 8; // size of margin around body in px 

var noOfColumns = 10;
var noOfRows = 10;

var grid = document.querySelector('#grid');
var alive = [];

function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
}

a = new Vector(2, 3);
b = new Vector(1, 1);
console.log(a.plus(b));

function AliveGrid(width, height) {
    this.aliveMap = new Array(width, height);
    this.width = width;
    this.height = height;
}
AliveGrid.prototype.isInside = function (vector) {
    return vector.x >= 0 && vector.x < this.width &&
        vector.y >= 0 && vector.y < this.height;
};
AliveGrid.prototype.get = function (vector) {
    return this.aliveMap[vector.x + this.width * vector.y];
};
AliveGrid.prototype.set = function (vector, value) {
    this.aliveMap[vector.x + this.width * vector.y] = value;
};
var aliveTest = new AliveGrid(noOfColumns, noOfRows);
console.log(aliveTest.get(new Vector(1, 1)));
aliveTest.set(new Vector(1, 1), "X");
console.log(aliveTest.get(new Vector(1, 1)));

var currentAlive = new AliveGrid(noOfColumns, noOfRows);
var newAlive = new AliveGrid(noOfColumns, noOfRows);

function createGrid() {

    var row, column = 0; // loop indexes
    var cleardiv;
    var currentId = 0;
    var body;

    //    function createHalfBox() {
    //        var halfboxdiv;
    //
    //        halfboxdiv = document.createElement('div');
    //        halfboxdiv.className = 'half-box';
    //
    //        return halfboxdiv;
    //    }

    function createDivWithCheckbox() {
        var div;
        var checkbox;

        div = document.createElement('div');
        div.className = 'grid-element';
        checkbox = document.createElement('input');
        // checkbox.className = 'checkbox';
        checkbox.type = 'checkbox';
        checkbox.id = 'cb' + currentId.toString();
        // checkbox.checked = alive[currentId];
        currentId += 1;
        div.appendChild(checkbox);

        return div;
    }

    //    function addOddRow() {
    //        // add first half-box
    //        document.body.appendChild(createHalfBox());
    //
    //        for (column = 0; column < noOfColumns - 1; column += 1) {
    //            document.body.appendChild(createBoxWithDot());
    //        }
    //
    //        // add last half-box
    //        document.body.appendChild(createHalfBox());
    //    }

    function addRow() {
        for (column = 0; column < noOfColumns; column += 1) {
            grid.appendChild(createDivWithCheckbox());
        }
    }

    for (row = 0; row < noOfRows; row += 1) {
        addRow();

        // clear the left float
        cleardiv = document.createElement('div');
        cleardiv.className = 'left-clear';
        grid.appendChild(cleardiv);
    }
}

function initializeAlive() {
    var row;
    var column;
    var isAlive;
    var checkbox;

    for (row = 0; row < noOfRows; row += 1) {
        for (column = 0; column < noOfColumns; column += 1) {
            currentAlive.set(new Vector(column, row), (Math.random() < 0.5 ? true : false));
        }
    }
}

function displayGrid(aliveMap) {
    var checkbox;

    for (row = 0; row < noOfRows; row += 1) {
        for (column = 0; column < noOfColumns; column += 1) {
            checkbox = document.getElementById('cb' + (row * noOfColumns + column).toString());
            checkbox.checked = currentAlive.get(new Vector(column, row));
        }
    }
}
//function changeDotColor(e) {
//    var clickedItem;
//    var elem;
//    var colorIndex;
//
//    if (e.target !== e.currentTarget) {
//        clickedItem = e.target.id;
//        // Only dots have an id so only continue if there is an id (i.e., dot clicked)
//        if (clickedItem) {
//            elem = document.getElementById(event.target.id);
//            colorIndex = colors.indexOf(elem.style.backgroundColor);
//            if (colorIndex < 0) {
//                elem.style.backgroundColor = colors[0]; // set to first color if not in array, original
//            } else {
//                elem.style.backgroundColor = colors[(colorIndex + 1) % colors.length];
//            }
//        }
//    }
//    e.stopPropagation();
//}

//function redrawBoard() {
//    var board = document.querySelector('#board');
//    while (board.firstChild) {
//        board.removeChild(board.firstChild);
//    }
//    createBoard();
//}
//var timeout;
//
//function resizeTimeout() {
//    console.log('window resized');
//    clearTimeout(timeout);
//    timeout = setTimeout(redrawBoard, 1000);
//}

//initializeAlive();
createGrid();
initializeAlive();
setTimeout(displayGrid, 5000, currentAlive);


// Changed from event listener for each do to one for the board.
// See www.kirupa.com/html5/handling_events_for_many_elements.htm
//board = document.querySelector('#board');
//board.addEventListener('click', changeDotColor, false);
//addEventListener('resize', resizeTimeout);