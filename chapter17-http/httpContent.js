var req = new XMLHttpRequest();
var response;
var resIdsTypes = [{
    text: 'text/plain'
}, {
    html: 'text/html'
}, {
    json: 'application/json'
}];
var id;
var resIdType;
var resType;

resIdsTypes.forEach(function (resIdType) {
    console.log('resIdType: ', resIdType, typeof resIdType);
    id = Object.keys(resIdType)[0];
    resType = resIdType[id];
    console.log('id: ', id, 'resType: ', resType);
    req.open("GET", "http:/eloquentjavascript.net/author", false);
    req.setRequestHeader('accept', resType);
    req.send(null);
    console.log(req.responseText);
    response = document.getElementById(id);
    response.innerHTML = req.responseText;
});