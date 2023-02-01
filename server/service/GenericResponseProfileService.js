'use strict';
var fileOperation = require('../node_modules/onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const onfPaths = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfPaths');

/**
 * Returns the Datatype of the Field
 *
 * uuid String 
 * returns inline_response_200_14
 **/
exports.getGenericResponseProfileDatatype = function(url) {
  return new Promise(async function(resolve, reject) {
    var response = {};
    var value = await fileOperation.readFromDatabaseAsync(url);
    response['application/json'] = {
  "response-profile-1-0:datatype" : value
};
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the Description of the Field
 *
 * uuid String 
 * returns inline_response_200_13
 **/
exports.getGenericResponseProfileDescription = function(url) {
  return new Promise(async function(resolve, reject) {
    var response = {};
    var value = await fileOperation.readFromDatabaseAsync(url); 
    response['application/json'] = {
  "response-profile-1-0:description" : value
};
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the name of the Field
 *
 * uuid String 
 * returns inline_response_200_12
 **/
exports.getGenericResponseProfileFieldName = function(url) {
  return new Promise(async function(resolve, reject) {
    var response = {};
    var value = await fileOperation.readFromDatabaseAsync(url);
   
    response['application/json'] = {
  "response-profile-1-0:field-name" : value
};
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the name of the Operation
 *
 * uuid String 
 * returns inline_response_200_11
 **/
exports.getGenericResponseProfileOperationName = function(url) {
  return new Promise(async function(resolve, reject) {
    var response = {};
    var value = await fileOperation.readFromDatabaseAsync(url);
    response['application/json'] = {
  "response-profile-1-0:operation-name" : value
};
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the Value of the Field
 *
 * uuid String 
 * returns inline_response_200_15
 **/
exports.getGenericResponseProfileValue = function(url) {
  return new Promise(async function(resolve, reject) {
    var response = {};
    var value = await fileOperation.readFromDatabaseAsync(url);
    response['application/json'] = {
  "response-profile-1-0:value" : value
};
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Configures the Value of the Field
 *
 * body Responseprofileconfiguration_value_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putGenericResponseProfileValue = function(url,body,uuid) {
  return new Promise(async function(resolve, reject) {
    try {
        let isInputHasValueReference = "value-reference" in body["response-profile-1-0:value"];
        let isValueReferenceExist = await fileOperation.readFromDatabaseAsync(
          onfPaths.RESPONSE_PROFILE_VALUE_REFERENCE.replace("{profileUuid}", uuid));
        if (isInputHasValueReference) {
          if (isValueReferenceExist != undefined) {
            await fileOperation.writeToDatabaseAsync(url, body, false);
          } else {
            let isDeleted = await fileOperation.deletefromDatabaseAsync(
              onfPaths.RESPONSE_PROFILE_STATIC_VALUE.replace(
                "{profileUuid}", uuid),
              "",
              false
            );
            if (isDeleted) {
              await fileOperation.writeToDatabaseAsync(url, body, false);
            }
          }
        } else {
          if (isValueReferenceExist != undefined) {
            let isDeleted = await fileOperation.deletefromDatabaseAsync(
              onfPaths.RESPONSE_PROFILE_VALUE_REFERENCE.replace(
                "{profileUuid}", uuid),
              "",
              false
            );
            if (isDeleted) {
              await fileOperation.writeToDatabaseAsync(url, body, false);
            }
          } else {
            await fileOperation.writeToDatabaseAsync(url, body, false);
          }
        }
        resolve();
      } catch (error) {}
      reject();
    });
  }
