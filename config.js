// create and export config vars
require('dotenv').config()

// container for all environments
var environments = {};

// staging obj
environments.staging = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: "staging",
  mongo: {
    user: process.env.MONGOUSER,
    pass: process.env.MONGOUSERPW
  }
};

// production obj
environments.production = {
  httpPort: 6000,
  httpsPort: 6001,
  envName: "production",
  mongo: {
    user: '',
    pass: ''
  }
};

// determine which environment was posted as a command line arg
var currentEnvironment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";

// check that currentEnv is set to a valid key: staging or production
var envToExport =
  typeof environments[currentEnvironment] == "object"
    ? environments[currentEnvironment]
    : environments.staging;

// export the module
module.exports = envToExport;
