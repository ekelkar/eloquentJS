    var field = document.querySelector('input');
    console.log('field: ', field);
    field.addEventListener('keydown', function (event) {
        // Do not allow Qq, Ww, or Xx as input
        if (event.keyCode == 81 || event.keyCode == 87 || event.keyCode == 88) {
            event.preventDefault();
        }
    });