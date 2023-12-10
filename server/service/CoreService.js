'use strict';

const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');

/**
 * Returns entire data tree
 *
 * returns inline_response_200_8
 **/
exports.getControlConstruct = async function () {
  var value = await fileOperation.readFromDatabaseAsync("core-model-1-4:control-construct");
  return {
    "core-model-1-4:control-construct": value
  };
}

/**
 * Returns entire instance of Profile
 *
 * url String 
 * returns inline_response_200_5
 **/
exports.getProfileInstance = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "core-model-1-4:profile": value
  };
}
