// create and export config vars

// container for all environments
var environments = {};

// staging obj
environments.staging = {
  port: 5000,
  envName: "staging"
};

// production obj
environments.production = {
  port: 6000,
  envName: "production"
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
