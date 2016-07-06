"use strict";

var month = {};

(function (exports) {

    var monthNames = ["January", "February", "March", "April",
                         "May", "June", "July", "August", "September",
                         "October", "November", "December"];
    exports.name = function (number) {
        return monthNames[number];
    };
    exports.number = function (name) {
        return monthNames.indexOf(name);
    };
}(month));


console.log(month.name(2));
console.log(month.number("November"));