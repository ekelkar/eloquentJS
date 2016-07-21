function byTagName(node, tagName) {
    var result = [],
        node,
        children,
        child;

    function checkForTag(node, tagName) {
        // If not an element node, do nothing
        if (node.nodeType == document.ELEMENT_NODE) {
            if (node.tagName.toLowerCase() === tagName) {
                result.push(node);
            }
            // Recusively check children for tag
            for (var i = 0; i < node.childNodes.length; i++) {
                checkForTag(node.childNodes[i], tagName);
            }
        }
    }

    checkForTag(node, tagName);

    return result;
}

//    console.log(node, tagName);
//    if (node.hasChildNodes()) {
//        // So, first we check if the object is not empty, if the object has child nodes
//        children = node.childNodes;
//
//        for (var i = 0; i < children.length; i++) {
//            // do something with each child as children[i]
//            // NOTE: List is live, Adding or removing children will change the list
//
//            child = children[i];
//            console.log(child);
//            console.log(child.tagName);
//            // If the child has a tagName (i.e., text nodes do not have a tag),
//            // check if the tagName matches tagName input to function
//            if (child.tagName && child.tagName.toLowerCase() === tagName) {
//    //                result.push(child);
//}
//}
//}
//
//
////    children = node.childNodes;
////    console.log(children);
//
//
//return result;
//}

console.log(byTagName(document.body, "h1").length);
console.log(byTagName(document.body, "span").length);

var para = document.querySelector("p");
console.log(byTagName(para, "span").length);