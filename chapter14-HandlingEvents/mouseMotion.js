var lastX; // Traks the last observed mouse X position
var rect = document.querySelector('div');

rect.addEventListener('mousedown', function (event) {
    console.log('mousedown');
    if (event.which == 1) {
        lastX = event.pageX;
        addEventListener('mousemove', moved);
        event.preventDefault(); // Prevent selection
    }
});

function buttonPressed(event) {
    if (event.button == null) {
        return event.which != 0;
    } else {
        return event.buttons != 0;
    }
}

function moved(event) {
    console.log(event.pageX);
    if (!buttonPressed(event)) {
        removeEventListener('mousemove', moved);
    } else {
        var dist = event.pageX - lastX;
        var newWidth = Math.max(10, rect.offsetWidth + dist);
        rect.style.width = newWidth + 'px';
        lastX = event.pageX;
    }
}