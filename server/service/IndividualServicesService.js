'use strict';


const operationServerInterface = require('../applicationPattern/onfModel/models/layerProtocols/OperationServerInterface');
const httpClientInterface = require('../applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const tcpClientInterface = require('../applicationPattern/onfModel/models/layerProtocols/TcpClientInterface');
const logicalTerminationPoint = require('../applicationPattern/onfModel/models/LogicalTerminationPoint');
const forwardingConstructService = require('../applicationPattern/onfModel/services/ForwardingConstructService');
const logicalTerminationPointService = require('../applicationPattern/onfModel/services/LogicalTerminationPointService');
const responseValue = require('../applicationPattern/rest/server/responseBody/ResponseValue');
const onfAttributeFormatter = require('../applicationPattern/onfModel/utility/OnfAttributeFormatter');
const layerProtocol = require('../applicationPattern/onfModel/models/LayerProtocol');
const adminProfile = require('../applicationPattern/onfModel/models/profile/AdminProfile');
const tcpServerInterface = require('../applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const consequentAction = require('../applicationPattern/rest/server/responseBody/ConsequentAction');
const httpServerInterface = require('../applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');

const serviceType = "Individual";
const protocol = "http";
/**
 * Checks authentication of an OaM request
 *
 * body V1_approveoamrequest_body 
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200_2  
 **/
exports.approveOamRequest = function (body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["application-name"];
      let releaseNumber = body["release-number"];
      let authorization = body["Authorization"];
      let method = body["method"];
      /****************************************************************************************
       * Preparing response body
       ****************************************************************************************/
      let isAuthorized = false;
      let reasonForObjection = "UNKNOWN";
      let approvalResult = {};
      let httpClientUuidForTheApplicationName = await httpClientInterface.getHttpClientUuidForTheApplicationName(applicationName);
      if (httpClientUuidForTheApplicationName != undefined) {
        let httpClientUuidForTheApplicationNameAndRegisterNumber = await httpClientInterface.getHttpClientUuidForTheApplicationAndReleaseNumber(applicationName, releaseNumber);
        if (httpClientUuidForTheApplicationNameAndRegisterNumber != undefined) {
          let isAuthorizationExists = await adminProfile.isAuthorizationExists(authorization);
          if (isAuthorizationExists != undefined && isAuthorizationExists == true) {
            let allowedMethod = await adminProfile.getAllowedMethodsForTheAuthorization(authorization);
            if (allowedMethod == adminProfile.AdminProfilePac.AdminProfileConfiguration.allowedMethodsEnum.ALL ||
              allowedMethod == adminProfile.AdminProfilePac.AdminProfileConfiguration.allowedMethodsEnum[method]) {
              isAuthorized = true;
            } else {
              reasonForObjection = "METHOD_NOT_ALLOWED";
            }
          } else {
            reasonForObjection = "AUTHORIZATION_CODE_UNKNOWN";
          }
        } else {
          reasonForObjection = "RELEASE_NUMBER_UNKNOWN";
        }
      } else {
        reasonForObjection = "APPLICATION_NAME_UNKNOWN";
      }
      if (isAuthorized) {
        approvalResult["oam-request-is-approved"] = isAuthorized;
      } else {
        approvalResult["oam-request-is-approved"] = false;
        approvalResult["reason-of-objection"] = reasonForObjection;
      }

      /****************************************************************************************
       * Setting 'application/json' response body
       ****************************************************************************************/
      response['application/json'] = approvalResult;
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Initiates process of embedding a new release
 *
 * body V1_bequeathyourdataanddie_body 
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.bequeathYourDataAndDie = function (body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Deletes the record of an application
 *
 * body V1_disregardapplication_body 
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.disregardApplication = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["application-name"];
      let applicationReleaseNumber = body["application-release-number"];

      /****************************************************************************************
       * Prepare attributes and configure logical-termination-point
       ****************************************************************************************/
      let operationClientList = await logicalTerminationPointService.deleteLogicalTerminationPointInstanceGroup(applicationName, applicationReleaseNumber);

      /****************************************************************************************
       * Prepare attributes to automate forwarding-construct
       ****************************************************************************************/
      if (operationClientList != undefined && operationClientList.length > 0) {
        let attributeList = [];
        /****************************************************************************************
         * Configure and automate forwarding construct
         ****************************************************************************************/
        let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
        forwardingConstructService.unConfigureAndAutomateForwardingConstruct(serviceType, operationServerUuid,
          operationClientList, attributeList, user, xCorrelator, traceIndicator, customerJourney);
      }
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Provides list of applications that are requested to send OaM request notifications
 *
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns List
 **/
exports.listApplications = function (user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * Preparing response body
       ****************************************************************************************/
      let applicationList = await getAllApplications();

      /****************************************************************************************
       * Setting 'application/json' response body
       ****************************************************************************************/
      response['application/json'] = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(applicationList);
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Adds to the list of applications
 *
 * body V1_regardapplication_body 
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.regardApplication = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, originalUrl) {
  return new Promise(async function (resolve, reject) {
    try {

      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["application-name"];
      let releaseNumber = body["application-release-number"];
      let applicationAddress = body["application-address"];
      let applicationPort = body["application-port"];
      let inquiringOamRequestApprovalsOperation = "/v1/inquire-oam-request-approvals";

      /****************************************************************************************
       * Prepare attributes and configure logical-termination-point
       ****************************************************************************************/
      let operationList = [inquiringOamRequestApprovalsOperation];
      let createdOperationInstanceInformationList = await logicalTerminationPointService.createLogicalTerminationPointInstanceGroup(applicationName, releaseNumber, applicationAddress,
        applicationPort, operationList);

      /****************************************************************************************
       * Prepare attributes to configure forwarding-construct
       ****************************************************************************************/
      let inquiringOamRequestApprovalsOperationClientUuid;
      for (let i = 0; i < createdOperationInstanceInformationList.length; i++) {
        let operationClientInstance = createdOperationInstanceInformationList[i];
        if (operationClientInstance.operationName.includes(inquiringOamRequestApprovalsOperation)) {
          inquiringOamRequestApprovalsOperationClientUuid = operationClientInstance.uuid;
        }
      }
      let forwardingConstructConfigurationList = [{
        "forwardingName": "NewApplicationCausesRequestForInquiringOamRequestApprovals",
        "OperationClientUuid": inquiringOamRequestApprovalsOperationClientUuid
      }];

      /****************************************************************************************
       * Prepare attributes to automate forwarding-construct
       ****************************************************************************************/
      let context = applicationName + releaseNumber;
      let oamApprovalOperation = await operationServerInterface.getOperationName("aa-0-0-1-op-s-3004");
      let attributeList = [{
          "name": "oam-approval-application",
          "value": applicationName
        },
        {
          "name": "oam-approval-application-release-number",
          "value": releaseNumber
        },
        {
          "name": "oam-approval-operation",
          "value": oamApprovalOperation
        },
        {
          "name": "oam-approval-address",
          "value": applicationAddress
        },
        {
          "name": "oam-approval-port",
          "value": applicationPort
        }
      ]

      /****************************************************************************************
       * Configure and automate forwarding construct
       ****************************************************************************************/
      let operationServerUuid = await operationServerInterface.getOperationServerUuidForTheOperationName(originalUrl);
      forwardingConstructService.configureAndAutomateForwardingConstruct(true, serviceType, operationServerUuid,
        forwardingConstructConfigurationList, attributeList, user, xCorrelator, traceIndicator, customerJourney, context);

      resolve();
    } catch (error) {
      reject();
    }
  });
}


/**
 * Starts application in generic representation
 *
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-capability/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200
 **/
exports.startApplicationInGenericRepresentation = function (user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(async function (resolve, reject) {
    let response = {};
    try {
      /****************************************************************************************
       * Preparing consequent-action-list for response body
       ****************************************************************************************/
      let consequentActionList = [];
      let baseUrl = protocol + "://" + await tcpServerInterface.getLocalAddress() + ":" + await tcpServerInterface.getLocalPort();
      let LabelForInformAboutApplication = "Inform about Application";
      let requestForInformAboutApplication = baseUrl + await operationServerInterface.getOperationName("aa-0-0-1-op-s-2002");
      let consequentActionForInformAboutApplication = new consequentAction(LabelForInformAboutApplication, requestForInformAboutApplication, false);
      consequentActionList.push(consequentActionForInformAboutApplication);

      /****************************************************************************************
       * Preparing response-value-list for response body
       ****************************************************************************************/
      let responseValueList = [];
      let applicationName = await httpServerInterface.getApplicationName();
      let reponseValue = new responseValue("applicationName", applicationName, typeof applicationName);
      responseValueList.push(reponseValue);

      /****************************************************************************************
       * Setting 'application/json' response body
       ****************************************************************************************/
      response['application/json'] = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase({
        consequentActionList,
        responseValueList
      });
    } catch (error) {
      console.log(error);
    }
    if (Object.keys(response).length > 0) {
      resolve(response[Object.keys(response)[0]]);
    } else {
      resolve();
    }
  });
}

/****************************************************************************************
 * Functions utilized by individual services
 ****************************************************************************************/

/**
 * @description This function returns list of application information application-name , release-number, application-address, application-port.
 * @return {Promise} return the list of application information
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> get all http client Interface and get the application name, release number and server-ltp<br>
 * <b>step 2 :</b> get the ipaddress and port name of each associated tcp-client <br>
 **/
function getAllApplications() {
  return new Promise(async function (resolve, reject) {
    let clientApplicationList = [];
    try {

      /** 
       * This class instantiate objects that holds the application name , release number, 
       * IpAddress and port information of the registered client applications
       */
      let clientApplicationInformation = class ClientApplicationInformation {
        applicationName;
        applicationReleaseNumber;
        applicationAddress;
        applicationPort;

        /**
         * @constructor 
         * @param {String} applicationName name of the client application.
         * @param {String} applicationReleaseNumber release number of the application.
         * @param {String} applicationAddress ip address of the application.
         * @param {String} applicationPort port of the application.
         **/
        constructor(applicationName, applicationReleaseNumber, applicationAddress, applicationPort) {
          this.applicationName = applicationName;
          this.applicationReleaseNumber = applicationReleaseNumber;
          this.applicationAddress = applicationAddress;
          this.applicationPort = applicationPort;
        }
      };
      let httpClientUuidList = await logicalTerminationPoint.getUuidListForTheProtocol(layerProtocol.layerProtocolNameEnum.HTTP_CLIENT);
      for (let i = 0; i < httpClientUuidList.length; i++) {
        let httpClientUuid = httpClientUuidList[i];
        let applicationName = await httpClientInterface.getApplicationName(httpClientUuid);
        let applicationReleaseNumber = await httpClientInterface.getReleaseNumber(httpClientUuid);
        let serverLtp = await logicalTerminationPoint.getServerLtpList(httpClientUuid);
        let tcpClientUuid = serverLtp[0];
        let applicationAddress = await tcpClientInterface.getRemoteAddress(tcpClientUuid);
        let applicationPort = await tcpClientInterface.getRemotePort(tcpClientUuid);
        let clientApplication = new clientApplicationInformation(applicationName, applicationReleaseNumber, applicationAddress, applicationPort);
        clientApplicationList.push(clientApplication);
      }
      resolve(clientApplicationList);
    } catch (error) {
      reject();
    }
  });
}