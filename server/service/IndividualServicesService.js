'use strict';

const LogicalTerminatinPointConfigurationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationInputWithMapping');
const LogicalTerminationPointService = require('onf-core-model-ap/applicationPattern/onfModel/services/LogicalTerminationPointWithMappingServices');
const LogicalTerminationPointConfigurationStatus = require('onf-core-model-ap/applicationPattern/onfModel/services/models/logicalTerminationPoint/ConfigurationStatus');
const layerProtocol = require('onf-core-model-ap/applicationPattern/onfModel/models/LayerProtocol');

const ForwardingConfigurationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructConfigurationServices');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
const prepareForwardingConfiguration = require('./individualServices/PrepareForwardingConfiguration');
const prepareForwardingAutomation = require('./individualServices/PrepareForwardingAutomation');
const ConfigurationStatus = require('onf-core-model-ap/applicationPattern/onfModel/services/models/ConfigurationStatus');
const individualServicesOperationsMapping = require('./individualServices/individualServicesOperationsMapping');


const httpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const operationServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationServerInterface');
const operationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');

const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const consequentAction = require('onf-core-model-ap/applicationPattern/rest/server/responseBody/ConsequentAction');
const responseValue = require('onf-core-model-ap/applicationPattern/rest/server/responseBody/ResponseValue');

const onfPaths = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfPaths');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const FcPort = require("onf-core-model-ap/applicationPattern/onfModel/models/FcPort");

const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver');
const logicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint');
const tcpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpClientInterface');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const ForwardingConstruct = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct');
const TcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const softwareUpgrade = require('./individualServices/SoftwareUpgrade');
const AdministratorCredentialList = require('./individualServices/AuthorizationApplication');

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
          let isFileExit = isAuthorizationExists.isFileExit;
          if (isAuthorizationExistValue && isFileExit) {

            let isAuthorized = await AdministratorCredentialList.isAuthorizedAsync(authorization, method)
            if (isAuthorized) {
              oamRequestIsApproved = true;
            } else {
              reasonOfObjection = "METHOD_NOT_ALLOWED";
            }
          } else {
            reasonOfObjection = "AUTHORIZATION_CODE_UNKNOWN";
            if (!isFileExit) {
              reasonOfObjection = "UNKNOWN";
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
    const FcportValue = 'PromptForBequeathingDataCausesTransferOfListOfApplications';
    try {

      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["new-application-name"];
      let releaseNumber = body["new-application-release"];
      let applicationProtocol = body["new-application-protocol"];
      let applicationAddress = body["new-application-address"];
      let applicationPort = body["new-application-port"];

      
    let newReleaseUuids = await resolveHttpTcpAndOperationClient(FcportValue)

      /****************************************************************************************
       * Prepare logicalTerminatinPointConfigurationInput object to 
       * configure logical-termination-point
       ****************************************************************************************/
      let isdataTransferRequired = true;
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

     
        if(releaseNumber != currentNewReleaseNumber){
          update.isReleaseUpdated = await httpClientInterface.setReleaseNumberAsync(newReleaseHttpClientLtpUuid, releaseNumber); }
         if(applicationName != currentNewReleaseApplicationName) {
           update.isApplicationNameUpdated = await httpClientInterface.setApplicationNameAsync(newReleaseHttpClientLtpUuid, applicationName);  }

           if (update.isReleaseUpdated || update.isApplicationNameUpdated) {
            let configurationStatus = new ConfigurationStatus(
              newReleaseHttpClientLtpUuid,
              undefined,
              true);
      logicalTerminationPointConfigurationStatus.httpClientConfigurationStatus = configurationStatus; 
           // ALT should know about this change
               
        if(applicationProtocol != currentNewReleaseRemoteProtocol){
          update.isProtocolUpdated = await tcpClientInterface.setRemoteProtocolAsync(tcpclientUuid, applicationProtocol);
        }
         if (JSON.stringify(applicationAddress) != JSON.stringify(currentNewReleaseRemoteAddress)) {
          update.isAddressUpdated = await tcpClientInterface.setRemoteAddressAsync(tcpclientUuid, applicationAddress);
        }
        if(applicationPort != currentNewReleaseRemotePort) {
          update.isPortUpdated = await tcpClientInterface.setRemotePortAsync(tcpclientUuid, applicationPort);
        }

        
        let serverAddress = await tcpServerInterface.getLocalAddressOfTheProtocol(applicationProtocol);
         let serverPort = await tcpServerInterface.getLocalPortOfTheProtocol(applicationProtocol);
          if ( applicationAddress === serverAddress && applicationPort === serverPort) {         
               isdataTransferRequired = false;
                 }

        if (update.isProtocolUpdated || update.isAddressUpdated || update.isPortUpdated) {
          let configurationStatus = new ConfigurationStatus(
           tcpclientUuid ,
            undefined,
            true);
          logicalTerminationPointConfigurationStatus.httpClientConfigurationStatus = configurationStatus;
          // ALT should know about this change

          let newReleaseTcpClientUuidList = await logicalTerminationPoint.getServerLtpListAsync(newReleaseHttpClientLtpUuid);
          let newReleaseTcpClientUuid = newReleaseTcpClientUuidList[0];
          if (applicationProtocol != currentNewReleaseRemoteProtocol) {
            update.isProtocolUpdated = await tcpClientInterface.setRemoteProtocolAsync(newReleaseTcpClientUuid, applicationProtocol);
          }
          if (applicationAddress != currentNewReleaseRemoteAddress) {
            update.isAddressUpdated = await tcpClientInterface.setRemoteAddressAsync(newReleaseTcpClientUuid, applicationAddress);
          }
          if (applicationPort != currentNewReleaseRemotePort) {
            update.isPortUpdated = await tcpClientInterface.setRemotePortAsync(newReleaseTcpClientUuid, applicationPort);
          }

          let isdataTransferRequired = true;
          let serverAddress = await tcpServerInterface.getLocalAddressOfTheProtocol(applicationProtocol);
          let serverPort = await tcpServerInterface.getLocalPortOfTheProtocol(applicationProtocol);
          if (applicationAddress === serverAddress && applicationPort === serverPort) {
            isdataTransferRequired = false;
          }

          if (update.isProtocolUpdated || update.isAddressUpdated || update.isPortUpdated) {
            let configurationStatus = new ConfigurationStatus(
              newReleaseTcpClientUuid,
              undefined,
              true);
            logicalTerminationPointConfigurationStatus.tcpClientConfigurationStatusList = [configurationStatus];
          }
          if (logicalTerminationPointConfigurationStatus != undefined) {

            /****************************************************************************************
             * Prepare attributes to automate forwarding-construct
             ****************************************************************************************/
            let forwardingAutomationInputList = await prepareForwardingAutomation.bequeathYourDataAndDie(
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
        }
      }
      softwareUpgrade.upgradeSoftwareVersion(isdataTransferRequired, user, xCorrelator, traceIndicator, customerJourney)
        .catch(err => console.log(`upgradeSoftwareVersion failed with error: ${err}`));
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
exports.disregardApplication = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, operationServerName) {
  return new Promise(async function (resolve, reject) {
    try {

      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["application-name"];
      let applicationReleaseNumber = body["release-number"];

      /****************************************************************************************
       * Prepare logicalTerminatinPointConfigurationInput object to 
       * configure logical-termination-point
       ****************************************************************************************/

      let logicalTerminationPointconfigurationStatus = await LogicalTerminationPointService.deleteApplicationInformationAsync(
        applicationName,
        applicationReleaseNumber
      );

      /****************************************************************************************
       * Prepare attributes to configure forwarding-construct
       ****************************************************************************************/

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

      /****************************************************************************************
       * Prepare attributes to automate forwarding-construct
       ****************************************************************************************/
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

      resolve();
    } catch (error) {
      reject(error);
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
      let applicationList = await getAllApplicationList();

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
exports.regardApplication = function (body, user, originator, xCorrelator, traceIndicator, customerJourney, operationServerName) {
  return new Promise(async function (resolve, reject) {
    try {

      /****************************************************************************************
       * Setting up required local variables from the request body
       ****************************************************************************************/
      let applicationName = body["application-name"];
      let releaseNumber = body["release-number"];
      let tcpServerList = [
        {
          protocol: body["protocol"],
          address: body["address"],
          port: body["port"]
        }
      ];
      let inquireOamRequestOperation = "/v1/inquire-oam-request-approvals";
      let operationNamesByAttributes = new Map();
      operationNamesByAttributes.set("inquire-oam-request-approvals", inquireOamRequestOperation);


      /****************************************************************************************
       * Prepare logicalTerminatinPointConfigurationInput object to 
       * configure logical-termination-point
       ****************************************************************************************/

      let logicalTerminatinPointConfigurationInput = new LogicalTerminatinPointConfigurationInput(
        applicationName,
        releaseNumber,
        tcpServerList,
        operationServerName,
        operationNamesByAttributes,
        individualServicesOperationsMapping.individualServicesOperationsMapping
      );
      let logicalTerminationPointconfigurationStatus = await LogicalTerminationPointService.findOrCreateApplicationInformationAsync(
        logicalTerminatinPointConfigurationInput
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

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/****************************************************************************************
 * Functions utilized by individual services
 ****************************************************************************************/

/**
 * @description This function returns list of registered application information application-name , release-number, application-address, application-port.
 * @return {Promise} return the list of application information
 * <b><u>Procedure :</u></b><br>
 * <b>step 1 :</b> get all http client Interface and get the application name, release number and server-ltp<br>
 * <b>step 2 :</b> get the ipaddress and port name of each associated tcp-client <br>
 **/
function getAllApplicationList() {
  return new Promise(async function (resolve, reject) {
    let clientApplicationList = [];
    let httpClientUuidList = [];
    let LogicalTerminationPointlist;

    const forwardingName = 'NewApplicationCausesRequestForInquiringOamRequestApprovals';
    try {

      let ForwardConstructName = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingName)
      let ForwardConstructUuid = ForwardConstructName[onfAttributes.GLOBAL_CLASS.UUID]
      let ListofUuid = await ForwardingConstruct.getFcPortListAsync(ForwardConstructUuid)

      for (let i = 0; i < ListofUuid.length; i++) {
        let PortDirection = ListofUuid[i][[onfAttributes.FC_PORT.PORT_DIRECTION]]
        if (PortDirection === FcPort.portDirectionEnum.OUTPUT) {
          LogicalTerminationPointlist = ListofUuid[i][onfAttributes.CONTROL_CONSTRUCT.LOGICAL_TERMINATION_POINT]
          let httpClientUuid = await logicalTerminationPoint.getServerLtpListAsync(LogicalTerminationPointlist)
          httpClientUuidList.push(httpClientUuid[0]);
        }
      }
      for (let j = 0; j < httpClientUuidList.length; j++) {
        let httpClientUuid = httpClientUuidList[j];
        let applicationName = await httpClientInterface.getApplicationNameAsync(httpClientUuid);
        let applicationReleaseNumber = await httpClientInterface.getReleaseNumberAsync(httpClientUuid);
        let serverLtp = await logicalTerminationPoint.getServerLtpListAsync(httpClientUuid);
        let tcpClientUuid = serverLtp[0];
        let applicationAddress = await tcpClientInterface.getRemoteAddressAsync(tcpClientUuid);
        let applicationPort = await tcpClientInterface.getRemotePortAsync(tcpClientUuid);
        let applicationProtocol = await tcpClientInterface.getRemoteProtocolAsync(tcpClientUuid)

        let application = {};
        application.applicationName = applicationName,
          application.releaseNumber = applicationReleaseNumber,
          application.protocol = applicationProtocol,
          application.address = applicationAddress,
          application.port = applicationPort,

          clientApplicationList.push(application);
      }
      resolve(clientApplicationList);
    } catch (error) {
      reject();
    }
  });
}


var resolveHttpTcpAndOperationClient = exports.resolveHttpTcpAndOperationClientUuidFromForwardingName =  function (forwardingName) {
  return new Promise(async function (resolve, reject) {
    try{
    let uuidList = {};
    let forwardConstructName = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingName)
    if (forwardConstructName === undefined) {
    return {};
    }
    let forwardConstructUuid = forwardConstructName[onfAttributes.GLOBAL_CLASS.UUID]
    let listofUuid = await ForwardingConstruct.getFcPortListAsync(forwardConstructUuid)
    let fcPort = listofUuid.find(fcp => fcp[onfAttributes.FC_PORT.PORT_DIRECTION] === FcPort.portDirectionEnum.OUTPUT);
    let operationClientUuid = fcPort[onfAttributes.FC_PORT.LOGICAL_TERMINATION_POINT];

    let httpClientUuid = (await logicalTerminationPoint.getServerLtpListAsync(operationClientUuid))[0];
    let tcpClientUuid = (await logicalTerminationPoint.getServerLtpListAsync(httpClientUuid))[0];
    uuidList = { httpClientUuid, tcpClientUuid ,operationClientUuid}
    resolve(uuidList)
      }catch(error){
        console.log(error)

      }
      resolve(httpClientUuidList)
    } catch (error) {
      console.log(error)
    }
  })
}