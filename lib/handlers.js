// define handlers
var handlers = {};

handlers.notFound = function(data, callback) {
  callback(404);
};

handlers.ping = function(data, callback) {
  callback(200);
};

handlers.hello = function(data, callback) {
  callback(200, { message: "welcome" });
};

module.exports = handlers;
