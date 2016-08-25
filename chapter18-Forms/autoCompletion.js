// Builds up an array with global variable names, like
// 'alert', 'document', and 'scrollTo'

var terms = [];
var name; // loop index
var field = document.getElementById('field');
var suggestions = document.getElementById('suggestions');


for (var name in window) {
    terms.push(name);
}

field.addEventListener('keyup', function () {
    var div;
    console.log('field: ', field.value);
    terms.forEach(function (term) {
        if (field.value === term.slice(0, field.value.length)) {
            console.log('found a match: ', term);
            div = document.createElement('div');
            div.innerHTML = term;
            div.id = term;

            console.log('div: ', div);
            suggestions.appendChild(div);
            div.addEventListener('click', function (e) {
                console.log('clicked: ', e.target.id);
                field.value = e.target.id;
            });
        }
    });
});