// This example is from https://docs.nodejitsu.com/articles/HTTP/clients/how-to-create-a-HTTP-request/

// The url we want is: 
// 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'

// This url works in browser but not in following code. 
// It responds with 301 Moved Permanently 
//      (i.e., response.statusCode and response.statusMessage)

// The response.headers.location is 
//    https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new

// Changing http to https and the following works.

https = require('https');
// http = require('http');

var options = {
  host: 'www.random.org',
  path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
};

var callback = (response) => {
  var str = '';

  // If there are problems, uncomment the following to help debug
  // console.log('callback function response code: ', response.statusCode,
  //  response.statusMessage, response.headers.location);

  // Another chunk of data has been recieved, append it to `str`  
  response.on('data', (chunk) => {
    str += chunk;
  });

  // The whole response has been received, print it out 
  response.on('end', () => {
    console.log(str);
  });
  //  {
  //    console.log(str);
  //  });
};

// http.request(options, callback).end();
https.request(options, callback).end();