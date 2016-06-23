var readline = require('readline');
var lines = ['this', 'is', 'the ', 'first', 'line'];
var i = 0;
var rl = readline.createInterface(process.stdin, process.stdout);
//rl.setPrompt('guess ');
// console.log(i, lines[i]);
//rl.prompt();
console.log(lines[i] + ' >');
rl.on('line', function(line) {
  i += 1;
  console.log('You typed: ' + line);
    if (line === "zzz") rl.close();
    // rl.prompt();
  console.log(lines[i] + ' >');
}).on('close',function(){
  
  // do rest of the processing here
    process.exit(0);
});