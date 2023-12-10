'use strict';

const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const prepareForwardingAutomation = require('./individualServices/PrepareForwardingAutomation');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
const operationClintService = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface')

/**
 * Returns detailed logging configuration.
 *
 * url String
 * returns inline_response_200_25
 **/
exports.getOperationClientDetailedLoggingIsOn = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "operation-client-interface-1-0:detailed-logging-is-on": value
  };
}

/**
 * Returns life cycle state of the operation
 *
 * url String 
 * returns inline_response_200_24
 **/
exports.getOperationClientLifeCycleState = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "operation-client-interface-1-0:life-cycle-state": value
  };
}

/**
 * Returns key used for connecting to server.
 *
 * uuid String 
 * returns inline_response_200_22
 **/
exports.getOperationClientOperationKey = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "operation-client-interface-1-0:operation-key": value
  };
}

/**
 * Returns operation name
 *
 * url String 
 * returns inline_response_200_21
 **/
exports.getOperationClientOperationName = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "operation-client-interface-1-0:operation-name": value
  };
}

/**
 * Returns operational state of the operation
 *
 * url String 
 * returns inline_response_200_23
 **/
exports.getOperationClientOperationalState = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "operation-client-interface-1-0:operational-state": value
  };
}

/**
 * Configures detailed logging on/off.
 *
 * url String 
 * body Operationclientinterfaceconfiguration_detailedloggingison_body 
 * no response value expected for this operation
 **/
exports.putOperationClientDetailedLoggingIsOn = async function (url, body) {
  await fileOperation.writeToDatabaseAsync(url, body, false);
}

/**
 * Configures key used for connecting to server.
 *
 * body Operationclientinterfaceconfiguration_operationkey_body 
 * url String 
 * no response value expected for this operation
 **/
exports.putOperationClientOperationKey = async function (url, body) {
  await fileOperation.writeToDatabaseAsync(url, body, false);
}

/**
 * Configures operation name
 *
 * body Operationclientinterfaceconfiguration_operationname_body
 * url String 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putOperationClientOperationName = async function (url, body, uuid) {
  const oldValue = await operationClintService.getOperationNameAsync(uuid);
  const newValue = body["operation-client-interface-1-0:operation-name"];
  if (oldValue !== newValue) {
    const isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);
    if (isUpdated) {
      const forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
        uuid
      );
      ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
        forwardingAutomationInputList
      );
    }
  }
}
