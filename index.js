/*
Primary file for API
*/

// dependencies
var http = require("http");
var url = require("url");

// the server should respond to all requests with a string
var server = http.createServer(function(req, res) {
  //   get url and parse it
  var parsedUrl = url.parse(req.url, true);

  //   get path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // get the http method
  var method = req.method.toLowerCase();

  //   send response
  res.end("hello world\n");

  //   log the request
  console.log(
    "Request recieved on path: " + trimmedPath + " with method " + method
  );
});

// start the server and listen on 3000
server.listen(5000, function() {
  console.log("The server is listening on port 5000 now.");
});
