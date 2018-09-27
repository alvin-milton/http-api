// handlers

// dependencies
var _data = require("./data");
var helpers = require("./helpers");

// define handlers
var handlers = {};

handlers.hello = function(data, callback) {
  callback(200, { message: "welcome" });
};

handlers.users = function(data, callback) {
  //   define acceptable methods for this route
  var acceptableMethods = ["post", "get", "put", "delete"];

  //   test if method isused
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// container for users handlers
handlers._users = {};

// users - get
// required fields: fname, lname, phone, pass, tosAgreement
handlers._users.post = function(data, callback) {
  // check that all required fields are present and correct
  var firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  var lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  var phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;
  var password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  var tosAgreement =
    typeof data.payload.tosAgreement == "boolean" &&
    data.payload.tosAgreement == true
      ? true
      : false;

  // console.log("firstName", firstName);
  // console.log("lastName", lastName);
  // console.log("phone", phone);
  // console.log("password", password);
  // console.log("tosAgreement", tosAgreement);

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure the user doesn't already exist

    _data.read(_data.returnFilePath("users", phone), function(err, data) {
      if (err) {
        // hash the password
        var hashedPassword = helpers.hash(password);

        if (hashedPassword) {
          // create user object
          var userObject = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            hashedPassword: hashedPassword,
            tosAgreement: true
          };
          // store the user
          _data.create(
            _data.returnFilePath("users", phone),
            userObject,
            function(err) {
              if (!err) {
                callback(200);
              } else {
                console.log(err);
                callback(500, {
                  Error: "Could not create the new user"
                });
              }
            }
          );
        } else {
          callback(500, {
            Error: "Could not hash the user's password"
          });
        }
      } else {
        // user already exists
        callback(400, {
          Error: "A user with that phone number already exists"
        });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required fields"
    });
  }
};

// users - post
handlers._users.get = function(data, callback) {};

// users - put
handlers._users.put = function(data, callback) {};

// users - delete
handlers._users.delete = function(data, callback) {};

handlers.notFound = function(data, callback) {
  callback(404);
};

handlers.ping = function(data, callback) {
  callback(200);
};

module.exports = handlers;
