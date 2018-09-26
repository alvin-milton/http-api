// helpers for various tasks

// deps
var crypto = require("crypto");
var config = require("./config");

// container for all the helpers

var helpers = {};

// helpers hash function SHA256
helpers.hash = function(str) {
  if (typeof str == "string" && str.length > 0) {
    // hash string
    var hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(str)
      .digest("hex");
    return hash;
  } else {
    return false;
  }
  return crypto.hash;
};

// exporting
module.exports = helpers;
