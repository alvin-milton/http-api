// Lib for storing and editing data

var fs = require("fs");
var path = require("path");

// container for module
var lib = {};

// define basedir for data folder
lib.baseDir = path.join(__dirname, "/../.data/");

// write data to a file
lib.create = function(dir, file, data, callback) {
  // open file for writing
  fs.open(lib.baseDir + dir + "/" + file + ".json", "wx", function(
    err,
    fileDescriptor
  ) {
    if (!err && fileDescriptor) {
      // convert data to string
      var stringData = JSON.stringify(data);
      // write to file and close it
      fs.writeFile(fileDescriptor, stringData, function(err) {
        if (!err) {
          // close file
          fs.close(fileDescriptor, function(err) {
            if (!err) {
              callback(false);
            } else {
              callback("Error closing new file");
            }
          });
        } else {
          callback("Error writing to new file");
        }
      });
    } else {
      callback("Could not create new file, it may already exist");
    }
  });
};

// read data from file
lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir + dir + "/" + file + ".json", "utf8", function(
    err,
    data
  ) {
    callback(err, data);
  });
};

lib.update = function(dir, file, data, callback) {
  // open file for writing
  fs.open(lib.baseDir + dir + "/" + file + ".json", "r+", function(
    err,
    fileDescriptor
  ) {
    if (!err && fileDescriptor) {
      // convert data to string
      var stringData = JSON.stringify(data);

      // truncate file
      fs.truncate(fileDescriptor, function(err) {
        if (!err) {
          // write to file and close it
          fs.writeFile(fileDescriptor, stringData, function(err) {
            if (!err) {
              fs.close(fileDescriptor, function(err) {
                if (!err) {
                  callback(false);
                } else {
                  callback("There was an error closing the file");
                }
              });
            } else {
              callback("Error writing to existing file");
            }
          });
        } else {
          callback("Error truncating file");
        }
      });
    } else {
      callback("Could not open the file for updating, it may not exist yet");
    }
  });
};

// export
module.exports = lib;
