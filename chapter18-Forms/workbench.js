var button = document.getElementById('button');

button.addEventListener('click', function () {
    var code = document.getElementById('code');
    var codeFunction;

    var output = document.getElementById('output');

    console.log('output:', output);
    console.log('button clicked');

    try {
        codeFunction = new Function('', code.value);
        console.log('run code');
        output.textContent = codeFunction().toString();
    } catch (e) {
        console.log('error:', e);
        output.textContent = e.message;
    }

    console.log('result: ', output.textContent);
});

myFunction = new Function('', 'function add(a, b) {return (a + b);} return (add(3, 5))');
console.log(myFunction().toString());