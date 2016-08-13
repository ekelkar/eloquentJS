function asTabs(node) {
    var i;
    var child;
    var attr;
    var divs;
    var div;
    var button;
    var buttons;
    var tabname;


    //    // The following gets all childNodes include nodes for spacing
    //    for (i = 0; i < node.childNodes.length; i += 1) {
    //        child = node.childNodes[i];
    //        console.log(i, ' ', child);
    //        attr = child.getAttribute('data-tabname');
    //        if (attr) {
    //            console.log(attr.textContent);
    //        }
    //    }
    divs = node.getElementsByTagName('div');
    for (i = 0; i < divs.length; i += 1) {
        div = divs[i];
        console.log(i, ' ', div);
        div.style = 'display: none';
        attr = div.getAttribute('data-tabname');
        if (attr) {
            console.log('attr: ', attr);
            console.log(div.textContent);
            button = document.createElement('button');
            console.log(button);
            button.textContent = attr;
            button.style = 'margin: 2px;'
                //            button.addEventListener('click', function (event) {
                //                console.log('attr:', attr);
                //                div.style = 'display: visible';
                //            });
            document.body.insertBefore(button, node);
        }
    }
    var buttons = document.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (event) {
            //            tabname = event.target;;
            console.log('event: ', event.target.innerHTML);
            // Clear all data
            for (i = 0; i < divs.length; i += 1) {
                div = divs[i];
                console.log('inside event div: ', div);
                console.log('div attr: ', div.getAttribute('data-tabname'));
                if (div.getAttribute('data-tabname') === event.target.innerHTML) {
                    div.style = 'display: visible;';
                } else {
                    div.style = 'display: none;';
                }
            }
            // Show data for this tab


        });
    }
}

asTabs(document.querySelector('#wrapper'));