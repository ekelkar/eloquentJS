var weekDay =
    `var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
             "Thursday", "Friday", "Saturday"];

exports.name = function(number) {
  return names[number];
};
exports.number = function(name) {
  return names.indexOf(name);
};`

function readFile(name) {
    /* This is a stub function. This functions should read a file and return
         that file as a string. */
    eval(name);
}

function require(name) {
    var code = new Function("exports", readFile(name));
    var exports = {};
    code(exports);
    return exports;
}

console.log(require("weekDay").name(1));