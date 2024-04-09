'use strict';
 
const fileOperation = require('../node_modules/onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
 
/**
 * Returns the description of the file
 *
 * url String
 * returns inline_response_200_17
 **/
exports.getFileProfileFileDescription = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "file-profile-1-0:file-description": value
  };
}
 
/**
 * Returns the identifier of the file
 *
 * url String
 * returns inline_response_200_16
 **/
exports.getFileProfileFileIdentifier = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "file-profile-1-0:file-identifier": value
  };
}
 
/**
 * Returns the path of the file
 *
 * url String
 * returns inline_response_200_18
 **/
exports.getFileProfileFileName = async function (url) {
  var value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "file-profile-1-0:file-name": value
  };
}
 
/**
 * Returns the allowed operation on the file
 *
 * uuid String
 * returns inline_response_200_21
 **/
exports.getFileProfileOperation = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "file-profile-1-0:operation": value
  };
}
 
 
/**
 * Configures path of the file
 *
 * body Fileprofileconfiguration_filepath_body
 * url String
 * no response value expected for this operation
 **/
exports.putFileProfileFileName = async function (url, body) {
  await fileOperation.writeToDatabaseAsync(url, body, false);
}
 
/**
 * Configures the allowed operation on the file
 *
 * body Fileprofileconfiguration_operation_body
 * url String
 * no response value expected for this operation
 **/
exports.putFileProfileOperation = async function (url, body) {
  await fileOperation.writeToDatabaseAsync(url, body, false);
}
 