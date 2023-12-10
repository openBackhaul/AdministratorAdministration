'use strict';

const LogicalTerminationPointConfigurationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationInput');
const LogicalTerminationPointService = require('onf-core-model-ap/applicationPattern/onfModel/services/LogicalTerminationPointServices');
const ForwardingConfigurationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructConfigurationServices');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
const prepareForwardingConfiguration = require('./individualServices/PrepareForwardingConfiguration');
const prepareForwardingAutomation = require('./individualServices/PrepareForwardingAutomation');
const ConfigurationStatus = require('onf-core-model-ap/applicationPattern/onfModel/services/models/ConfigurationStatus');
const LogicalTerminationPointConfigurationStatus = require('onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationStatus');
const individualServicesOperationsMapping = require('./individualServices/individualServicesOperationsMapping');
const LogicalTerminationPointServiceOfUtility = require("onf-core-model-ap-bs/basicServices/utility/LogicalTerminationPoint")
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const tcpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpClientInterface');
const softwareUpgrade = require('./individualServices/SoftwareUpgrade');
const AdministratorCredentialList = require('./individualServices/AuthorizationApplication');
const createHttpError = require('http-errors');
const TcpObject = require('onf-core-model-ap/applicationPattern/onfModel/services/models/TcpObject');

const NEW_RELEASE_FORWARDING_NAME = 'PromptForBequeathingDataCausesTransferOfListOfApplications';

/**
 * Checks authentication of an OaM request
 *
 * body V1_approveoamrequest_body 
 * returns inline_response_200_2
 **/
exports.approveOamRequest = function (body) {
  return new Promise(async function (resolve, reject) {
    try {

      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["application-name"];
      let applicationReleaseNumber = body["release-number"];
      let authorization = body["Authorization"];
      let method = body["method"];



      /****************************************************************************************
       * Prepare logicalTerminatinPointConfigurationInput object to 
       * configure logical-termination-point
       ****************************************************************************************/
      let oamRequestIsApproved = false;
      let reasonOfObjection = "UNKNOWN";
      let isApplicationExists = await httpClientInterface.isApplicationExists(applicationName);
      if (isApplicationExists) {
        let isReleaseExists = await httpClientInterface.isApplicationExists(applicationName, applicationReleaseNumber);
        if (isReleaseExists) {

          let isAuthorizationExists = await AdministratorCredentialList.isAuthorizationExistAsync(authorization)
          let isAuthorizationExistValue = isAuthorizationExists.isAuthorizationExist;
          let isFileExist = isAuthorizationExists.isFileExit;
          if (isAuthorizationExistValue && isFileExist) {

            let isAuthorized = await AdministratorCredentialList.isAuthorizedAsync(authorization, method)
            if (isAuthorized) {
              oamRequestIsApproved = true;
            } else {
              reasonOfObjection = "METHOD_NOT_ALLOWED";
            }
          } else {
            reasonOfObjection = "AUTHORIZATION_CODE_UNKNOWN";
            if (!isFileExist) {
              reject(new createHttpError.InternalServerError("ApplicationData file does not exist"));
            }
          }
        } else {
          reasonOfObjection = "RELEASE_NUMBER_UNKNOWN";
        }
      } else {
        reasonOfObjection = "APPLICATION_NAME_UNKNOWN";
      }

      var response = {};
      if (oamRequestIsApproved) {
        response['application/json'] = {
          "oam-request-is-approved": oamRequestIsApproved
        };
      } else {
        response['application/json'] = {
          "reason-of-objection": reasonOfObjection,
          "oam-request-is-approved": oamRequestIsApproved
        };
      }

      if (Object.keys(response).length > 0) {
        resolve(response[Object.keys(response)[0]]);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
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
exports.bequeathYourDataAndDie = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, operationServerName) {
  return new Promise(async function (resolve, reject) {

    try {

      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["new-application-name"];
      let releaseNumber = body["new-application-release"];
      let applicationProtocol = body["new-application-protocol"];
      let applicationAddress = body["new-application-address"];
      let applicationPort = body["new-application-port"];


      let newReleaseUuids = await LogicalTerminationPointServiceOfUtility.resolveHttpTcpAndOperationClientUuidOfNewRelease()
      /****************************************************************************************
       * Prepare logicalTerminatinPointConfigurationInput object to 
       * configure logical-termination-point
       ****************************************************************************************/
      let newReleaseHttpClientLtpUuid = newReleaseUuids.httpClientUuid;
      let tcpclientUuid = newReleaseUuids.tcpClientUuid;

      let currentNewReleaseApplicationName = await httpClientInterface.getApplicationNameAsync(newReleaseHttpClientLtpUuid);
      let currentNewReleaseNumber = await httpClientInterface.getReleaseNumberAsync(newReleaseHttpClientLtpUuid);
      let currentNewReleaseRemoteAddress = await tcpClientInterface.getRemoteAddressAsync(tcpclientUuid);
      let currentNewReleaseRemoteProtocol = await tcpClientInterface.getRemoteProtocolAsync(tcpclientUuid);
      let currentNewReleaseRemotePort = await tcpClientInterface.getRemotePortAsync(tcpclientUuid);

      let update = {};
      let logicalTerminationPointConfigurationStatus = {};
      if (newReleaseHttpClientLtpUuid != undefined) {

        if (releaseNumber != currentNewReleaseNumber) {
          update.isReleaseUpdated = await httpClientInterface.setReleaseNumberAsync(newReleaseHttpClientLtpUuid, releaseNumber);
        }
        if (applicationName != currentNewReleaseApplicationName) {
          update.isApplicationNameUpdated = await httpClientInterface.setApplicationNameAsync(newReleaseHttpClientLtpUuid, applicationName);
        }

        // ALT should know about this change

        if (applicationProtocol != currentNewReleaseRemoteProtocol) {
          update.isProtocolUpdated = await tcpClientInterface.setRemoteProtocolAsync(tcpclientUuid, applicationProtocol);
        }
        if (JSON.stringify(applicationAddress) != JSON.stringify(currentNewReleaseRemoteAddress)) {
          update.isAddressUpdated = await tcpClientInterface.setRemoteAddressAsync(tcpclientUuid, applicationAddress);
        }
        if (applicationPort != currentNewReleaseRemotePort) {
          update.isPortUpdated = await tcpClientInterface.setRemotePortAsync(tcpclientUuid, applicationPort);
        }

        let tcpClientConfigurationStatus = new ConfigurationStatus(
          tcpclientUuid,
          '',
          (update.isProtocolUpdated || update.isAddressUpdated || update.isPortUpdated)
        );
        let httpClientConfigurationStatus = new ConfigurationStatus(
          newReleaseHttpClientLtpUuid,
          '',
          (update.isReleaseUpdated || update.isApplicationNameUpdated)
        );
        logicalTerminationPointConfigurationStatus = new LogicalTerminationPointConfigurationStatus(
          false,
          httpClientConfigurationStatus,
          [tcpClientConfigurationStatus]
        );

        let forwardingAutomationInputList;
        if (logicalTerminationPointConfigurationStatus != undefined) {

          /****************************************************************************************
           * Prepare attributes to automate forwarding-construct
           ****************************************************************************************/
          forwardingAutomationInputList = await prepareForwardingAutomation.bequeathYourDataAndDie(
            logicalTerminationPointConfigurationStatus
          );
          ForwardingAutomationService.automateForwardingConstructAsync(
            operationServerName,
            forwardingAutomationInputList,
            user,
            xCorrelator,
            traceIndicator,
            customerJourney
          );
        }


        softwareUpgrade.upgradeSoftwareVersion(user, xCorrelator, traceIndicator, customerJourney, forwardingAutomationInputList.length)
          .catch(err => console.log(`upgradeSoftwareVersion failed with error: ${err}`));
      }
      resolve();
    } catch (error) {
      reject(error);
    }
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
exports.disregardApplication = async function (body, user, originator, xCorrelator, traceIndicator, customerJourney, operationServerName) {
  let applicationName = body["application-name"];
  let applicationReleaseNumber =  body["release-number"];

  let httpClientUuid = await httpClientInterface.getHttpClientUuidExcludingOldReleaseAndNewRelease(
    applicationName,
    applicationReleaseNumber,
    NEW_RELEASE_FORWARDING_NAME
  );
  let logicalTerminationPointconfigurationStatus = await LogicalTerminationPointService.deleteApplicationLtpsAsync(
    httpClientUuid
  );

  let forwardingConfigurationInputList = [];
  let forwardingConstructConfigurationStatus;
  let operationClientConfigurationStatusList = logicalTerminationPointconfigurationStatus.operationClientConfigurationStatusList;

  if (operationClientConfigurationStatusList) {
    forwardingConfigurationInputList = await prepareForwardingConfiguration.disregardApplication(
      operationClientConfigurationStatusList
    );
    forwardingConstructConfigurationStatus = await ForwardingConfigurationService.
      unConfigureForwardingConstructAsync(
        operationServerName,
        forwardingConfigurationInputList
      );
  }

  let forwardingAutomationInputList = await prepareForwardingAutomation.disregardApplication(
    logicalTerminationPointconfigurationStatus,
    forwardingConstructConfigurationStatus
  );
  ForwardingAutomationService.automateForwardingConstructAsync(
    operationServerName,
    forwardingAutomationInputList,
    user,
    xCorrelator,
    traceIndicator,
    customerJourney
  );
}

/**
 * Provides list of applications that are requested to send OaM request notifications
 *
 * returns List
 **/
exports.listApplications = async function () {
    const forwardingName = 'NewApplicationCausesRequestForInquiringOamRequestApprovals';
    let applicationList = await LogicalTerminationPointServiceOfUtility.getAllApplicationList(forwardingName);
    return onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(applicationList);
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
exports.regardApplication = async function (body, user, originator, xCorrelator, traceIndicator, customerJourney, operationServerName) {
  let applicationName = body["application-name"];
  let releaseNumber = body["release-number"];
  let tcpServerList = [new TcpObject(body["protocol"], body["address"], body["port"])];
  let inquireOamRequestOperation = "/v1/inquire-oam-request-approvals";
  let operationNamesByAttributes = new Map();
  operationNamesByAttributes.set("inquire-oam-request-approvals", inquireOamRequestOperation);

  /****************************************************************************************
   * Prepare logicalTerminatinPointConfigurationInput object to 
   * configure logical-termination-point
   ****************************************************************************************/
  let httpClientUuid = await httpClientInterface.getHttpClientUuidExcludingOldReleaseAndNewRelease(
    applicationName,
    releaseNumber,
    NEW_RELEASE_FORWARDING_NAME);
  let ltpConfigurationInput = new LogicalTerminationPointConfigurationInput(
    httpClientUuid,
    applicationName,
    releaseNumber,
    tcpServerList,
    operationServerName,
    operationNamesByAttributes,
    individualServicesOperationsMapping.individualServicesOperationsMapping
  );
  let logicalTerminationPointconfigurationStatus = await LogicalTerminationPointService.createOrUpdateApplicationLtpsAsync(
    ltpConfigurationInput
  );

  /****************************************************************************************
   * Prepare attributes to configure forwarding-construct
   ****************************************************************************************/

  let forwardingConfigurationInputList = [];
  let forwardingConstructConfigurationStatus;
  let operationClientConfigurationStatusList = logicalTerminationPointconfigurationStatus.operationClientConfigurationStatusList;

  if (operationClientConfigurationStatusList) {
    forwardingConfigurationInputList = await prepareForwardingConfiguration.regardApplication(
      operationClientConfigurationStatusList,
      inquireOamRequestOperation
    );
    forwardingConstructConfigurationStatus = await ForwardingConfigurationService.
      configureForwardingConstructAsync(
        operationServerName,
        forwardingConfigurationInputList
      );
  }

  /****************************************************************************************
   * Prepare attributes to automate forwarding-construct
   ****************************************************************************************/
  let forwardingAutomationInputList = await prepareForwardingAutomation.regardApplication(
    logicalTerminationPointconfigurationStatus,
    forwardingConstructConfigurationStatus,
    applicationName,
    releaseNumber
  );
  ForwardingAutomationService.automateForwardingConstructAsync(
    operationServerName,
    forwardingAutomationInputList,
    user,
    xCorrelator,
    traceIndicator,
    customerJourney
  );
}

/****************************************************************************************
 * Functions utilized by individual services
 ****************************************************************************************/
