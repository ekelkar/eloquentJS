var req = new XMLHttpRequest();
var response;

// https://plantsdb.xyz/search?species=acutalata
req.open("GET", "https:/plantsdb.xyz/search?species=daisy");
req.setRequestHeader('accept', 'application/json');
req.send(null);
console.log(req.responseText);
response = document.getElementById('response');
response.innerHTML = req.responseText;