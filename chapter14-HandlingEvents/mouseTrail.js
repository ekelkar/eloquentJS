var i = 0; // loop index
var text = 'test';
var div;
var trailArray = [];
var heading;
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

colors.forEach(function (color) {
    div = document.createElement('div');
    div.className = 'trail';
    div.style.background = color;
    trailArray.push(div);
});

body = document.querySelector('body');
body.addEventListener('mousemove', function (event) {
    var currentTrail;

    currentTrail = trailArray.shift();
    trailArray.push(currentTrail);
    currentTrail.style.left = event.pageX + 'px';
    currentTrail.style.top = event.pageY + 'px';
    document.body.appendChild(currentTrail);
});