/*
Primary file for API
*/

// deps
var http = require("http");
var https = require("https");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;
var config = require("./lib/config");
var fs = require("fs");
var handlers = require("./lib/handlers");
var helpers = require("./lib/helpers");

// Instantiating the HTTP server
var httpServer = http.createServer(function(req, res) {
  unifiedServer(req, res);
});

// Starting the server
httpServer.listen(config.httpPort, function() {
  console.log(
    "The server is listening on port " +
      config.httpPort +
      " now. Enviroment: " +
      config.envName
  );
});

// Instantiating the HTTPS server
var httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem")
};

var httpsServer = https.createServer(httpsServerOptions, function(req, res) {
  unifiedServer(req, res);
});

// Starting the HTTPS server
httpsServer.listen(config.httpsPort, function() {
  console.log(
    "The server is listening on port " +
      config.httpsPort +
      " now. Enviroment: " +
      config.envName
  );
});

// All the server logic for both HTTP & HTTPS
var unifiedServer = function(req, res) {
  //   get url and parse it
  var parsedUrl = url.parse(req.url, true);

  //   get path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // parse the query string as an obj
  var queryStringObject = parsedUrl.query;

  // get the http method
  var method = req.method.toLowerCase();

  // get the headers as an obj
  var headers = req.headers;

  // get the payload, if any
  var decoder = new StringDecoder("utf-8");
  var buffer = "";

  req.on("data", function(data) {
    buffer += decoder.write(data);
  });

  req.on("end", function() {
    buffer += decoder.end();

    // choose handler that request should go to
    // if none found, use notFound
    var chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // construct data obj to send to handler
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parseJSONtoObject(buffer)
    };

    // rout the rewquset to handler specified in the router
    chosenHandler(data, function(statusCode, payload) {
      // use the status code called back by the handler
      // or default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // use the payload called back by the handler
      // or default to empty obj
      payload = typeof payload == "object" ? payload : {};

      // convert the payload to a string
      var payloadString = JSON.stringify(payload);

      // return response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      // log the request
      // console.log(
      //   "Request recieved on path: " +
      //     trimmedPath +
      //     " with method " +
      //     method +
      //     " and with these query string params:",
      //   queryStringObject
      // );
      // console.log("request recieved with these headers: ", headers);
      // console.log("request recieved with this payload: ", buffer);
      // console.log("returning this response: ", statusCode, payloadString);
    });
  });
};

// define a request router
var router = {
  ping: handlers.ping,
  users: handlers.users,
  hello: handlers.hello
};
