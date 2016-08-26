// Conway’s Game of Life
//
// Conway’s Game of Life is a simple simulation that creates artificial “life” 
// on a grid, each cell of which is either live or not. Each generation (turn), 
//    the following rules are applied:
//
//    Any live cell with fewer than two or more than three live neighbors dies.
//
//    Any live cell with two or three live neighbors lives on to the next generation.
//
//    Any dead cell with exactly three live neighbors becomes a live cell.
//
// A neighbor is defined as any adjacent cell, including diagonally adjacent ones.
//
// Note that these rules are applied to the whole grid at once, not one square at 
// a time. That means the counting of neighbors is based on the situation at the start 
// of the generation, and changes happening to neighbor cells during this generation 
// should not influence the new state of a given cell.
//
// Implement this game using whichever data structure you find appropriate. Use 
// Math.random to populate the grid with a random pattern initially. Display it as a 
// grid of checkbox fields, with a button next to it to advance to the next generation. 
// When the user checks or unchecks the checkboxes, their changes should be included 
// when computing the next generation.
// 
// Checked check box indicates creature in that cell is alive.

var noOfColumns = 5;
var noOfRows = 3;

var grid = document.querySelector('#grid');
var next = document.getElementById('next');

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
}

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

var currentAlive = new AliveGrid(noOfColumns, noOfRows);
var newAlive = new AliveGrid(noOfColumns, noOfRows);

var directions = {
    'n': new Vector(0, -1),
    'ne': new Vector(1, -1),
    'e': new Vector(1, 0),
    'se': new Vector(1, 1),
    's': new Vector(0, 1),
    'sw': new Vector(-1, 1),
    'w': new Vector(-1, 0),
    'nw': new Vector(-1, -1),
}

var directionNames = Object.keys(directions);

function createGrid() {

    var row, column = 0; // loop indexes
    var cleardiv;
    var currentId = 0;
    var body;

    function createDivWithCheckbox() {
        var div;
        var checkbox;

        function updateCell() {
            var idNo = parseInt(checkbox.id.slice(2));
            var cellVector = new Vector(idNo % noOfColumns,
                Math.floor(idNo / noOfColumns));
            currentAlive.set(cellVector, checkbox.checked);
            console.log('checkbox clicked: ', idNo, checkbox.checked);
            console.log('checked vector: ', cellVector, currentAlive.get(cellVector));
        }

        div = document.createElement('div');
        div.className = 'grid-element';
        checkbox = document.createElement('input');
        // checkbox.className = 'checkbox';
        checkbox.type = 'checkbox';
        checkbox.id = 'cb' + currentId.toString();
        // checkbox.checked = alive[currentId];
        checkbox.addEventListener('click', updateCell);
        currentId += 1;
        div.appendChild(checkbox);

        return div;
    }

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

    for (row = 0; row < noOfRows; row += 1) {
        for (column = 0; column < noOfColumns; column += 1) {
            currentAlive.set(new Vector(column, row), (Math.random() < 0.5 ? true : false));
        }
    }
}

function neighborAlive(column, row, directionName) {
    var locationToCheck = directions[directionName].plus(new Vector(column, row));

    if (currentAlive.isInside(locationToCheck)) {
        return currentAlive.get(locationToCheck);
    } else {
        return false;
    }
}

function updateNewCell(column, row, noNeighborsAlive) {
    var location = new Vector(column, row);
    var isAlive = currentAlive.get(location);
    var nextAlive;

    if (isAlive) {
        if (noNeighborsAlive === 2 || noNeighborsAlive === 3) {
            newAlive.set(location, true);
            nextAlive = true;
        } else {
            newAlive.set(location, false);
            nextAlive = false;
        }
    } else { // cell currently dead
        if (noNeighborsAlive === 3) {
            newAlive.set(location, true);
            nextAlive = true;
        } else {
            newAlive.set(location, false);
            nextAlive = false;
        }
    }
    console.log('column: ', column, 'row: ', row, 'isAlive: ', isAlive)
    console.log('noNeighborsAlive: ', noNeighborsAlive);
    console.log('nextAlive: ', nextAlive);
}

function computeNextGeneration() {
    var noNeighborsAlive = 0;

    for (row = 0; row < noOfRows; row += 1) {
        for (column = 0; column < noOfColumns; column += 1) {
            noNeighborsAlive = 0;

            directionNames.forEach(function (directionName) {
                if (neighborAlive(column, row, directionName)) {
                    noNeighborsAlive += 1;
                }
            });
            updateNewCell(column, row, noNeighborsAlive);
        }
    }
    currentAlive = newAlive;
    displayGrid(newAlive);
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
next.addEventListener('click', computeNextGeneration);
createGrid();
initializeAlive();
displayGrid();


// Changed from event listener for each do to one for the board.
// See www.kirupa.com/html5/handling_events_for_many_elements.htm
//board = document.querySelector('#board');
//board.addEventListener('click', changeDotColor, false);
//addEventListener('resize', resizeTimeout);