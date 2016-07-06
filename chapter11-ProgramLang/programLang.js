"use strict";

function skipSpace(string) {
    // Skip space until a single character other than a white space is found   

    var first = string.search(/\S/);

    if (first === -1) {
        return "";
    }
    // Return a new string that starts at the first non-white space character
    return string.slice(first);
}

function parseExpression(program) {
    var match, expr;

    program = skipSpace(program);

    // Match a quoted string with zero or more characters excluding the double quote
    // character starting at the beginning of the input.
    // Due to jslint issues with notting (^) input, I changed the regular expression 
    //    /^"([^"]*)"/
    //    to just allow letters, numbers, and white spaces in strings.
    //    /^"([\w\s]*)"/
    // match returns null if regular expression not in string checked.

    match = /^"([\w\s]*)"/.exec(program);
    if (match) {
        expr = {
            type: "value",
            value: match[1]
        };
    } else {
        // Match a string of one or more digits followed by a word boundary \b
        match = /^\d+\b/.exec(program);
        if (match) {
            expr = {
                type: "value",
                value: Number(match[0])
            };
        } else {
            // Match an identifier or word which has one or more of any characters 
            // other than space, left paran, right paran, comma, double quote
            // Due to jslint issues with notting (^) input, I changed the regular
            //     expression /^[^\s(),"]+/
            //     to allow letters, numbers and symbols other than left paran,
            //         right paran, comma, double quote
            //         /^[\w~!@#$%&*_-{};?+\/=><]+/
            match = /^[\w~!@#$%&*_-{};?+\/=><]+/.exec(program);
            if (match) {
                expr = {
                    type: "word",
                    name: match[0]
                };
            } else {
                throw new SyntaxError("Unexpected syntax: " + program);
            }
        }
    }
    return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr, program) {
    // Checks if the expression is an application. If so, parse the parantehsized
    //     list of arguments.
    var arg;
    program = skipSpace(program);
    if (program[0] !== "(") { // Not an application
        return {
            expr: expr,
            rest: program
        };
    }

    program = skipSpace(program.slice(1));
    expr = {
        type: "apply",
        operator: expr,
        args: []
    };
    while (program[0] !== ')') {
        arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] === ",") {
            program = skipSpace(program.slice(1));
        } else if (program[0] !== ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    return parseApply(expr, program.slice(1));
}

function parse(program) {
    var result = parseExpression(program);
    // console.log("Result: ", result);
    if (skipSpace(result.rest).length > 0) {
        throw new SyntaxError("Unexpected text after program");
    }
    return result.expr;
}

//console.log("short expression: ", parseExpression('"short"'));
//console.log("long expression: ", parseExpression('"long expression"'));
//console.log("short number: ", parseExpression('5'));
//console.log("long number: ", parseExpression('5987'));
//console.log("word: ", parseExpression('a'));
//console.log("word: ", parseExpression('='));
//console.log("word: ", parseExpression('a+b'));
console.log(parse("+(a, 10)"));
console.log("Invalid: ", parseExpression("'a+b'")); // strings cannot have +