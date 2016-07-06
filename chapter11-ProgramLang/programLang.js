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

var specialForms = Object.create(null);

function evaluate(expr, env) {
    var op;
    switch (expr.type) {

    case "value":
        // Return the value of string and numeric literals.   
        return expr.value;

    case "word":
        // Look up variables in the global environment
        // Replaced the following with the above due to jslint warnings.
        //if (env.hasOwnProperty(expr.name)) {
        if (expr.name in env) {
            return env[expr.name];
        } // else {
        throw new ReferenceError("Undefined variable: " + expr.name);
        //    }

    case "apply":
        if (expr.operator.type === "word" &&
            // specialForms.hasOwnProperty(expr.operator.name)) {
            // Replaced the following with above due to jslint warnings.
            expr.operator.name in specialForms) {
            return specialForms[expr.operator.name](expr.args, env);
        }
        op = evaluate(expr.operator, env);
        if (typeof op !== "function") {
            throw new TypeError("Applying a non-function.");
        }
        return op.apply(null, expr.args.map(function (arg) {
            return evaluate(arg, env);
        }));
    }
}

specialForms["if"] = function (args, env) {
    if (args.length !== 3) {
        throw new SyntaxError("Bad number of args to if");
    }
    if (evaluate(args[0], env) !== false) {
        return evaluate(args[1], env);
    } // Changed because of jslint hint else {
    return evaluate(args[2], env);
    //  }
};

specialForms["while"] = function (args, env) {
    if (args.length !== 2) {
        throw new SyntaxError("Bad number of Args to while");
    }
    while (evaluate(args[0], env) !== false) {
        evaluate(args[1], env);

        // Since undefined does not exist in Egg, we return false,
        // for lack of a meaningful result.
    }
};

specialForms["do"] = function (args, env) {
    var value = false;

    args.forEach(function (arg) {
        value = evaluate(arg, env);
    });
    return value;
};

specialForms["define"] = function (args, env) {
    var value;

    if (args.length !== 2 || args[0].type !== "word") {
        throw new SyntaxError("Bad use of define");
    }
    value = evaluate(args[1], env);
    env[args[0].name] = value;
    return value;
};

var topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;

["+", "-", "*", "/", "==", "<", ">"].forEach(function (op) {
    topEnv[op] = new Function("a, b", "return a " + op + " b;");
});

topEnv["print"] = function (value) {
    console.log(value);
    return value;
};

function run() {
    var env = Object.create(topEnv);
    var program = Array.prototype.slice.call(arguments, 0).join("\n");
    return evaluate(parse(program), env);
}


//console.log("short expression: ", parseExpression('"short"'));
//console.log("long expression: ", parseExpression('"long expression"'));
//console.log("short number: ", parseExpression('5'));
//console.log("long number: ", parseExpression('5987'));
//console.log("word: ", parseExpression('a'));
//console.log("word: ", parseExpression('='));
//console.log("word: ", parseExpression('a+b'));
//console.log(parse("+(a, 10)"));
//console.log("Invalid: ", parseExpression("'a+b'")); // strings cannot have +

//run("do(define(a, 10),",
//    "  print(+(a, 10)))");

run("do(define(total, 15),",
    //    "   define(count, 1),",
    //    "   while(<(count, 11),",
    //    "         do(define(total, +(total, count)),",
    //    "            define(count, +(count, 1)))),",
    "   print(total))");


console.log(parse(prog));
console.log(evaluate(prog, topEnv));