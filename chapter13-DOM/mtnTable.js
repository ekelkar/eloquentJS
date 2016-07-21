// The following works with node but not with html. Figure it out later. 
// var MOUNTAINS = require("./mtn.js");

var MOUNTAINS = [
    {
        name: "Kilimanjaro",
        height: 5895,
        country: "Tanzania"
    },
    {
        name: "Everest",
        height: 8848,
        country: "Nepal"
    },
    {
        name: "Mount Fuji",
        height: 3776,
        country: "Japan"
    },
    {
        name: "Mont Blanc",
        height: 4808,
        country: "Italy/France"
    },
    {
        name: "Vaalserberg",
        height: 323,
        country: "Netherlands"
    },
    {
        name: "Denali",
        height: 6168,
        country: "United States"
    },
    {
        name: "Popocatepetl",
        height: 5465,
        country: "Mexico"
    }
];

console.log(MOUNTAINS);

// elt is a utility function which creates an element node and treats the rest of its arguments 
// as children to that node.

function elt(type) {
    var node = document.createElement(type);
    for (var i = 1; i < arguments.length; i++) {
        var child = arguments[i];
        if (typeof child == "string")
            child = document.createTextNode(child);
        node.appendChild(child);
    }
    return node;
}


// Given an array of objects that all have the same set of properties, build up a DOM structure
// the table
function buildTable() {
    var tableHeadings = Object.keys(MOUNTAINS[0]);
    //        headingRow = function (heading) {
    //            //            return elt("th", heading);
    //            console.log(heading);
    //            return elt("th", heading);
    //        };
    //
    //    console.log(tableHeadings);
    //    console.log(tableHeadings.map(headingRow).join(','));
    //
    //    var node = elt("table",
    //        elt("tr",
    //            //           elt("th", "data")));
    //            //      elt("th", tableHeadings[0])));
    //            // This produces an string of HTMLTableCellElement(s)
    //            //            tableHeadings.map(headingRow, this).join(',')));
    //            tableHeadings.map(headingRow, this)));
    //
    //    return node;
    var mtnArr = [],
        i = 0,
        i = 0,
        headings = '',
        table = document.createElement("table"),
        tr = document.createElement("tr"),
        th = document.createElement("th"),
        headingRow = tr;

    tr.setAttribute("id", "row0");
    var addMtn = function (mtn) {
        var indMtnData = [];
        headings.forEach(function (heading) {
            console.log(heading);
            console.log('mtn: ', mtn);
            indMtnData.push(mtn[heading]);
        });
        console.log(indMtnData);
        mtnArr.push(indMtnData);
    }

    mtnArr[0] = Object.keys(MOUNTAINS[0]);
    headings = Object.keys(MOUNTAINS[0]);
    console.log(mtnArr);

    MOUNTAINS.forEach(addMtn);
    console.log(mtnArr);

    function addHeading(heading) {

        headingItem = document.createElement("th");
        headingText = document.createTextNode(heading);
        headingItem.appendChild(headingText);
        document.querySelector("tr").appendChild(headingItem);
        //      document.getElementById(row).appendChild(dataItem);   
    }
    //    headings.forEach(function (heading) {
    //        headingText = document.createTextNode(heading);
    //        headingRow.appendChild(th).appendChild(headingText);
    //    });

    function addMtnData(data, row) {
        console.log("data:", data);
        console.log("row:", row);

        dataItem = document.createElement("td");
        dataText = document.createTextNode(data);
        dataItem.appendChild(dataText);
        //        document.querySelector("tr").appendChild(dataItem);
        document.getElementById(row).appendChild(dataItem);
    }

    function addMtnRow(mtn, no) {
        var prevRow = "row" + (no - 1).toString(),
            currRow = "row" + (no).toString(),
            i = 0;

        console.log(prevRow, currRow);

        mtnRow = document.createElement("tr");
        mtnRow.setAttribute("id", currRow);
        //        document.getElementById(prevRow).appendChild(mtnRow);
        document.querySelector("table").appendChild(mtnRow);
        for (i = 0; i < mtn.length; i += 1) {
            addMtnData(mtn[i], currRow);
        }
        //        mtn.forEach(addMtnData(currRow));
    }

    document.body.appendChild(table);

    document.querySelector("table").appendChild(tr);

    for (var i = 0; i < headings.length; i += 1) {
        addHeading(headings[0]);
    }
    for (var i = 1; i < mtnArr.length; i += 1) {
        addMtnRow(mtnArr[i], i);
        //        var id = "row" + string(i - 1);
        //
        //        document.querySelector("table")
        //        mtn = mtnArr[i];
        //        console.log("mtn: ", mtn);
        //        mtnRow = document.createElement("tr");
        //        mtn.forEach(function (item) {
        //            console.log("item: ", item);
        //            mtnData = document.createElement("td");
        //            document.getElementById(id).;
        //            // mtnData.appendChild(item);
    };
}

buildTable();

// This inserts the table after the script tag for this in the html
// Will this be a problem?
//document.body.appendChild(buildTable());