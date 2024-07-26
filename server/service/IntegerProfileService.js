'use strict';
var fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');




/**
 * Returns the name of the Integer
 *
 * uuid String 
 * returns inline_response_200_20
 **/
exports.getIntegerProfileIntegerName = function(url) {
  return new Promise(async function(resolve, reject) {
    try {
        var value = await fileOperation.readFromDatabaseAsync(url);
        var response = {};
        response['application/json'] = {
          "integer-profile-1-0:integer-name": value
        };
        if (Object.keys(response).length > 0) {
          resolve(response[Object.keys(response)[0]]);
        } else {
          resolve();
        }
      } catch (error) {
        reject();
      }
  });
}


/**
 * Returns the configured value of the Integer
 *
 * uuid String 
 * returns inline_response_200_25
 **/
exports.getIntegerProfileIntegerValue = function(url) {
  return new Promise(async function(resolve, reject) {
    try {
        var value = await fileOperation.readFromDatabaseAsync(url);
        var response = {};
        response['application/json'] = {
          "integer-profile-1-0:integer-value": value
        };
        if (Object.keys(response).length > 0) {
          resolve(response[Object.keys(response)[0]]);
        } else {
          resolve();
        }
      } catch (error) {
        reject();
      }
    
  });
}


/**
 * Returns the maximum value of the Integer
 *
 * uuid String 
 * returns inline_response_200_24
 **/
exports.getIntegerProfileMaximum = function(url) {
  return new Promise(async function(resolve, reject) {
  
    try {
        var value = await fileOperation.readFromDatabaseAsync(url);
        var response = {};
        response['application/json'] = {
          "integer-profile-1-0:maximum": value
        };
        if (Object.keys(response).length > 0) {
          resolve(response[Object.keys(response)[0]]);
        } else {
          resolve();
        }
      } catch (error) {
        reject();
      }
   
  });
}


/**
 * Returns the minimum value of the Integer
 *
 * uuid String 
 * returns inline_response_200_23
 **/
exports.getIntegerProfileMinimum = function(url) {
  return new Promise(async function(resolve, reject) {
    
    try {
        var value = await fileOperation.readFromDatabaseAsync(url);
        var response = {};
        response['application/json'] = {
          "integer-profile-1-0:minimum": value
        };
        if (Object.keys(response).length > 0) {
          resolve(response[Object.keys(response)[0]]);
        } else {
          resolve();
        }
      } catch (error) {
        reject();
      }
  
    
  });
}


/**
 * Returns the purpose of the Integer
 *
 * uuid String 
 * returns inline_response_200_21
 **/
exports.getIntegerProfilePurpose = function(url) {
  return new Promise(async function(resolve, reject) {
  
    try {
        var value = await fileOperation.readFromDatabaseAsync(url);
        var response = {};
        response['application/json'] = {
          "integer-profile-1-0:purpose": value
        };
        if (Object.keys(response).length > 0) {
          resolve(response[Object.keys(response)[0]]);
        } else {
          resolve();
        }
      } catch (error) {
        reject();
      }
  
  });
}


/**
 * Returns the unit of the Integer
 *
 * uuid String 
 * returns inline_response_200_22
 **/
exports.getIntegerProfileUnit = function(url) {
  return new Promise(async function(resolve, reject) {
  
    try {
        var value = await fileOperation.readFromDatabaseAsync(url);
        var response = {};
        response['application/json'] = {
          "integer-profile-1-0:unit": value
        };
        if (Object.keys(response).length > 0) {
          resolve(response[Object.keys(response)[0]]);
        } else {
          resolve();
        }
      } catch (error) {
        reject();
      }
  
  
  
  });
}


/**
 * Configures value of the Integer
 *
 * body Integerprofileconfiguration_integervalue_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putIntegerProfileIntegerValue = function(url,body) {
  return new Promise(async function(resolve, reject) {
    try {
        await fileOperation.writeToDatabaseAsync(url, body, false);
        resolve();
      } catch (error) {
        reject();
      }
  });
}

