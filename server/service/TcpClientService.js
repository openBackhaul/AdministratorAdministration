'use strict';
var fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const prepareForwardingAutomation = require('./individualServices/PrepareForwardingAutomation');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
var tcpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpClientInterface');

/**
 * Returns remote IPv4 address
 *
 * uuid String 
 * returns inline_response_200_28
 **/
exports.getTcpClientRemoteAddress = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "tcp-client-interface-1-0:remote-address": value
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

exports.getTcpClientRemoteProtocol = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
        var value = await fileOperation.readFromDatabaseAsync(url);
        if (value.toUpperCase() == "HTTP") {
          value = "tcp-client-interface-1-0:PROTOCOL_TYPE_HTTP";
        } else if (value.toUpperCase() == "HTTPS") {
          value = "tcp-client-interface-1-0:PROTOCOL_TYPE_HTTPS";
        } else {
          value = "tcp-client-interface-1-0:PROTOCOL_TYPE_NOT_YET_DEFINED";
        }
        var response = {};
        response['application/json'] = {
          "tcp-client-interface-1-0:remote-protocol": value
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
 * Returns target TCP port at server
 *
 * uuid String 
 * returns inline_response_200_29
 **/
exports.getTcpClientRemotePort = function (url) {
  return new Promise(async function (resolve, reject) {
    try {
      var value = await fileOperation.readFromDatabaseAsync(url);
      var response = {};
      response['application/json'] = {
        "tcp-client-interface-1-0:remote-port": value
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
 * Configures remote IPv4 address
 *
 * body Ipaddress_ipv4address_body 
 * uuid String 
 * no response value expected for this operation
 **/



exports.putTcpClientRemoteAddress = function(url,body,uuid) {
  return new Promise(async function(resolve, reject) {
    try {
      let isUpdated = await tcpClientInterface.setRemoteAddressAsync(uuid, body["tcp-client-interface-1-0:remote-address"]);
      /****************************************************************************************
       * Prepare attributes to automate forwarding-construct
       ****************************************************************************************/
      if(isUpdated){
        let forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
          uuid
        );
        ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
          forwardingAutomationInputList
        );
      }      
      resolve();
    } catch (error) {
      reject();
    }
  });
}
/**
 * Configures target TCP port at server
 *
 * body Tcpclientinterfaceconfiguration_remoteport_body 
 * uuid String 
 * no response value expected for this operation
 **/
exports.putTcpClientRemotePort = function (url, body,uuid) {
  return new Promise(async function (resolve, reject) {
    try {
      let isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);

 

      /****************************************************************************************
       * Prepare attributes to automate forwarding-construct
       ****************************************************************************************/
      if(isUpdated){
        let forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
          uuid
        );
        ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
          forwardingAutomationInputList
        );
      }      
      resolve();
    } catch (error) {}
    reject();
  });
}

exports.putTcpClientRemoteProtocol = function(url,body,uuid) {
  return new Promise(async function(resolve, reject) {
  
      try {
        let value = body["tcp-client-interface-1-0:remote-protocol"];
        if (value == "tcp-client-interface-1-0:PROTOCOL_TYPE_HTTP") {
          body["tcp-client-interface-1-0:remote-protocol"] = "HTTP";
        } else if (value == "tcp-client-interface-1-0:PROTOCOL_TYPE_HTTPS") {
          body["tcp-client-interface-1-0:remote-protocol"] = "HTTPS";
        } else {
          body["tcp-client-interface-1-0:remote-protocol"] = "NOT_YET_DEFINED";
        }
        let isUpdated = await fileOperation.writeToDatabaseAsync(url, body, false);
  
   
  
        /****************************************************************************************
         * Prepare attributes to automate forwarding-construct
         ****************************************************************************************/
        if(isUpdated){
          let forwardingAutomationInputList = await prepareForwardingAutomation.OAMLayerRequest(
            uuid
          );
          ForwardingAutomationService.automateForwardingConstructWithoutInputAsync(
            forwardingAutomationInputList
          );
        }      
        resolve();
      } catch (error) {
        reject();
      }
    });
  }
