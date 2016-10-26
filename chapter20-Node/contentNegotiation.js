var http = require('http');
var mediaTypes = ['text/plain', 'text/html', 'application/json'];

mediaTypes.forEach(function (mediaType) {
  var request = http.request({
    hostname: 'eloquentjavascript.net',
    path: '/author',
    method: 'GET',
    headers: {
      Accept: mediaType
    }
  }, (response) => {
    var str = '';
    console.log('Server resonded with status code', response.statusCode,
      response.statusMessage);

    response.on('data', (chunk) => {
      str += chunk;
    });
    response.on('end', () => {
      console.log(str);
    });
  });
  request.end();
});