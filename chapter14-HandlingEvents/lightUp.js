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

var board;

function createBoard() {
    var noOfColumns = Math.floor((window.innerWidth - MARGIN * 2) / BOXSIZE);
    var noOfRows = Math.floor((window.innerHeight - MARGIN * 2) / BOXSIZE);
    var row, column = 0; // loop indexes
    var cleardiv;
    var currentId = 0;
    var body;

    function createHalfBox() {
        var halfboxdiv;

        halfboxdiv = document.createElement('div');
        halfboxdiv.className = 'half-box';

        return halfboxdiv;
    }

    function createBoxWithDot() {
        var boxdiv;
        var dotdiv;

        boxdiv = document.createElement('div');
        boxdiv.className = 'box';
        dotdiv = document.createElement('div');
        dotdiv.className = 'dot';
        dotdiv.id = 'dot' + currentId.toString();
        currentId += 1;
        boxdiv.appendChild(dotdiv);

        return boxdiv;
    }

    function addOddRow() {
        // add first half-box
        document.body.appendChild(createHalfBox());

        for (column = 0; column < noOfColumns - 1; column += 1) {
            document.body.appendChild(createBoxWithDot());
        }

        // add last half-box
        document.body.appendChild(createHalfBox());
    }

    function addEvenRow() {
        for (column = 0; column < noOfColumns; column += 1) {
            document.body.appendChild(createBoxWithDot());
        }
    }

    body = document.querySelector('body');
    for (row = 0; row < noOfRows; row += 1) {
        if (row % 2 === 0) {
            addEvenRow();
        } else {
            addOddRow();
        }

        // clear the left float
        cleardiv = document.createElement('div');
        cleardiv.className = 'left-clear';
        document.body.appendChild(cleardiv);
    }
}

function changeDotColor(e) {
    var clickedItem;
    var elem;
    var colorIndex;

    if (e.target !== e.currentTarget) {
        clickedItem = e.target.id;
        // Only dots have an id so only continue if there is an id (i.e., dot clicked)
        if (clickedItem) {
            elem = document.getElementById(event.target.id);
            colorIndex = colors.indexOf(elem.style.backgroundColor);
            if (colorIndex < 0) {
                elem.style.backgroundColor = colors[0]; // set to first color if not in array, original
            } else {
                elem.style.backgroundColor = colors[(colorIndex + 1) % colors.length];
            }
        }
    }
    e.stopPropagation();
}

function redrawBoard() {
    var board = document.querySelector('#board');
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    createBoard();
}
var timeout;

function resizeTimeout() {
    console.log('window resized');
    clearTimeout(timeout);
    timeout = setTimeout(redrawBoard, 1000);
}

createBoard();
// Changed from event listener for each do to one for the board.
// See www.kirupa.com/html5/handling_events_for_many_elements.htm
board = document.querySelector('#board');
board.addEventListener('click', changeDotColor, false);
addEventListener('resize', resizeTimeout);