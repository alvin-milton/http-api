/*
Primary file for API
*/

// dependencies
var http = require("http");

// the server should respond to all requests with a string
var server = http.createServer(function(req, res) {
  res.end("hello world\n");
});

// start the server and listen on 3000
server.listen(5000, function() {
  console.log("The server is listening on port 5000 now.");
});
