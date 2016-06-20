/* 
The verify function takes a regular expression compares it to two test arrays.
    
    Input:
      regexp - regular expression inside // or /.../ if no expression provides
      yes    - an array of strings that should match the regexp
      no     - an array of strings that should NOT match the regexp
      
  It prints a message on the console if the expression does not match a string in
  the yes array or the expression matches a string in the no array.
  */
     
function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  
  console.log(regexp.source);
  if (regexp.source == "...") {
   return; 
  }
  yes.forEach(function(s) {
   if (!regexp.test(s)) {
     console.log("Failure to match '" + s + "'");
   } else {
     console.log("Matched as expected regexp: " + regexp + " in str '" + s + "'");
   }
  });
  no.forEach(function(s) {
   if (regexp.test(s)) {
      console.log("Unexpected match for regexp: " + regexp + " in str '" + s + "'"); 
   }
  });
}

// Match car and cat
verify (/ca[rt]/, 
        ["my car", "bad cats"],
        ["camper", "high art"]);

// Match pop and prop
verify(/pr*op/,
       ["pop culture", "mad props"],
       ["plop"]);

// Match ferret, ferry, and ferrari
verify (/ferr(et|y|ari)/,
        ["ferret", "ferry", "ferrari"],
        ["ferrum", "transfer A"]);

// Any word ending in ious
verify(/[a-zA-Z]+ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

// A shorter way, any word ending in ious
verify(/\D+ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

// A whitespace character followed by a dot, comma, colon, or semicolon
verify(/\s[.,:;]/,
       ["bad punctionation ."],
       ["escape the dot"]);

// A word longer than six letters
verify(/\w{7,}/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

// A word without the letter e
//  without the ^space it matches the space between the words
verify(/\b[^e ]+\b/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);

// A word with the letter e
verify(/\D*e\D*\b/,
       ["red platypus", "wobbling nest"],
       ["bad cat", "smart dog"]);
