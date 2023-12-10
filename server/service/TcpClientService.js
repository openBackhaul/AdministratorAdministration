'use strict';

const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const prepareForwardingAutomation = require('./individualServices/PrepareForwardingAutomation');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
const tcpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpClientInterface');

/**
 * Returns remote IPv4 address
 *
 * url String 
 * returns inline_response_200_28
 **/
exports.getTcpClientRemoteAddress = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "tcp-client-interface-1-0:remote-address": value
  };
}

exports.getTcpClientRemoteProtocol = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "tcp-client-interface-1-0:remote-protocol": value
  };
}

/**
 * Returns target TCP port at server
 *
 * url String 
 * returns inline_response_200_29
 **/
exports.getTcpClientRemotePort = async function (url) {
  const value = await fileOperation.readFromDatabaseAsync(url);
  return {
    "tcp-client-interface-1-0:remote-port": value
  };
}

/**
 * Configures remote IPv4 address
 *
 * url String
 * body Ipaddress_ipv4address_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putTcpClientRemoteAddress = async function (url, body, uuid) {
  let oldValue = await tcpClientInterface.getRemoteAddressAsync(uuid);
  let newValue = body["tcp-client-interface-1-0:remote-address"];
  if (JSON.stringify(oldValue) != JSON.stringify(newValue)) {
    let isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);
    if (isUpdated) {
      let forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
        uuid
      );
      ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
        forwardingAutomationInputList
      );
    }
  }
}

/**
 * Configures target TCP port at server
 *
 * url String
 * body Tcpclientinterfaceconfiguration_remoteport_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putTcpClientRemotePort = async function (url, body, uuid) {
  const oldValue = await tcpClientInterface.getRemotePortAsync(uuid);
  const newValue = body["tcp-client-interface-1-0:remote-port"];
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

exports.putTcpClientRemoteProtocol = async function (url, body, uuid) {
  const oldValue = await tcpClientInterface.getRemoteProtocolAsync(uuid)
  const newValue = body["tcp-client-interface-1-0:remote-protocol"];
  const value = tcpClientInterface.getProtocolFromProtocolEnum(oldValue)[1]
  if (value !== newValue) {
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
