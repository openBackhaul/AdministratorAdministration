const ForwardingProcessingInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/forwardingConstruct/ForwardingProcessingInput');

const ForwardingConstructProcessingService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructProcessingServices');
const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const operationServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationServerInterface');
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const eventDispatcher = require('onf-core-model-ap/applicationPattern/rest/client/eventDispatcher');
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const forwardingConstructAutomationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/forwardingConstruct/AutomationInput');
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const logicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint');
const stringProfileInstance = require('./RegardApplication')

exports.CreateLinkForInquiringBasicAuthApprovals = async function (applicationName, releaseNumber, reqheaders) {
    return new Promise(async function (resolve, reject) {
        try {
            let inquiringOamRequestCreateLinkForwardingName = "RegardApplicationCausesSequenceForInquiringBasicAuthRequestApprovals.CreateLinkForInquiringBasicAuthApprovals";
            let inquiringOamRequestCreateLinkRequestBody = {};
            let stringProfile = await stringProfileInstance.getStringValueAndPattern('NameOfOperationForInquiringApprovals')
            let inquireBasicAuthOperationName = stringProfile.stringValue

            inquiringOamRequestCreateLinkRequestBody.servingApplicationName = applicationName;
            inquiringOamRequestCreateLinkRequestBody.servingApplicationReleaseNumber = releaseNumber;
            inquiringOamRequestCreateLinkRequestBody.operationName = inquireBasicAuthOperationName;
            inquiringOamRequestCreateLinkRequestBody.consumingApplicationName = await HttpServerInterface.getApplicationNameAsync();
            inquiringOamRequestCreateLinkRequestBody.consumingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();

            inquiringOamRequestCreateLinkRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(inquiringOamRequestCreateLinkRequestBody);
            let forwardingAutomation = new ForwardingProcessingInput(
                inquiringOamRequestCreateLinkForwardingName,
                inquiringOamRequestCreateLinkRequestBody
            );

            let response = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                forwardingAutomation,
                reqheaders.user,
                reqheaders.xCorrelator,
                reqheaders.traceIndicator + "." + reqheaders.traceIndicatorIncrementer++,
                reqheaders.customerJourney

            )
            resolve(response)

        }
        catch (error) {
            reject(error);
        }
    });
}

exports.RequestForInquiringBasicAuthApprovals = async function (applicationName, releaseNumber, reqheaders) {
    return new Promise(async function (resolve, reject) {
        try {
            let result;
            let inquiringOamRequestCreateLinkForwardingName = "RegardApplicationCausesSequenceForInquiringBasicAuthRequestApprovals.RequestForInquiringBasicAuthApprovals";
            let inquiringOamRequestContext = applicationName + releaseNumber;
            let requestForInquiringBasicAuthCreateLinkForApproveRequestBody = {};
            requestForInquiringBasicAuthCreateLinkForApproveRequestBody.applicationName = await HttpServerInterface.getApplicationNameAsync();
            requestForInquiringBasicAuthCreateLinkForApproveRequestBody.releaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            requestForInquiringBasicAuthCreateLinkForApproveRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-2-op-s-is-005");
            requestForInquiringBasicAuthCreateLinkForApproveRequestBody.address = await tcpServerInterface.getLocalAddressForForwarding();
            requestForInquiringBasicAuthCreateLinkForApproveRequestBody.port = await tcpServerInterface.getLocalPort();
            requestForInquiringBasicAuthCreateLinkForApproveRequestBody.protocol = await tcpServerInterface.getLocalProtocol();
            requestForInquiringBasicAuthCreateLinkForApproveRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestForInquiringBasicAuthCreateLinkForApproveRequestBody);

            let forwardingAutomation = new forwardingConstructAutomationInput(
                inquiringOamRequestCreateLinkForwardingName,
                requestForInquiringBasicAuthCreateLinkForApproveRequestBody,
                inquiringOamRequestContext
            );

            let forwardingConstructAutomationList = []
            forwardingConstructAutomationList.push(forwardingAutomation);
            let operationClientUuid = await operationuuid(forwardingConstructAutomationList, inquiringOamRequestContext)
            result = await eventDispatcher.dispatchEvent(
                operationClientUuid,
                requestForInquiringBasicAuthCreateLinkForApproveRequestBody,
                reqheaders.user,
                reqheaders.xCorrelator,
                reqheaders.traceIndicator + "." + reqheaders.traceIndicatorIncrementer++,
                reqheaders.customerJourney
            );
            resolve(result)
        }

        catch (error) {
            reject(error);
        }
    });
}

exports.CreateLinkForApprovingBasicAuthRequests = async function (applicationName, releaseNumber, reqheaders) {
    return new Promise(async function (resolve, reject) {
        try {
            let createLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringBasicAuthRequestApprovals.CreateLinkForApprovingBasicAuthRequests";
            let createLinkForApprovingBasicAuthRequestsApproveRequestBody = {};
            createLinkForApprovingBasicAuthRequestsApproveRequestBody.servingApplicationName = await HttpServerInterface.getApplicationNameAsync();
            createLinkForApprovingBasicAuthRequestsApproveRequestBody.servingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            createLinkForApprovingBasicAuthRequestsApproveRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-2-op-s-is-005");
            createLinkForApprovingBasicAuthRequestsApproveRequestBody.consumingApplicationName = applicationName
            createLinkForApprovingBasicAuthRequestsApproveRequestBody.consumingApplicationReleaseNumber = releaseNumber
            createLinkForApprovingBasicAuthRequestsApproveRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(createLinkForApprovingBasicAuthRequestsApproveRequestBody);

            let forwardingAutomation = new ForwardingProcessingInput(
                createLinkForApprovingBasicAuthRequestsForwardingName,
                createLinkForApprovingBasicAuthRequestsApproveRequestBody
            );

            let response = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                forwardingAutomation,
                reqheaders.user,
                reqheaders.xCorrelator,
                reqheaders.traceIndicator + "." + reqheaders.traceIndicatorIncrementer++,
                reqheaders.customerJourney

            )
            resolve(response)
        }

        catch (error) {
            reject(error);
        }
    });
}

exports.CreateLinkForInquiringOamApprovals = async function (applicationName, releaseNumber, reqheaders) {
    return new Promise(async function (resolve, reject) {
        try {

            let createLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringOamRequestApprovals.CreateLinkForInquiringOamApprovals";

            let inquiringOamRequestCreateLinkRequestBody = {};
            inquiringOamRequestCreateLinkRequestBody.servingApplicationName = applicationName;
            inquiringOamRequestCreateLinkRequestBody.servingApplicationReleaseNumber = releaseNumber;
            inquiringOamRequestCreateLinkRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-2-op-s-bm-005");
            inquiringOamRequestCreateLinkRequestBody.consumingApplicationName = await HttpServerInterface.getApplicationNameAsync();
            inquiringOamRequestCreateLinkRequestBody.consumingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            inquiringOamRequestCreateLinkRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(inquiringOamRequestCreateLinkRequestBody);
            let forwardingAutomation = new ForwardingProcessingInput(
                createLinkForApprovingBasicAuthRequestsForwardingName,
                inquiringOamRequestCreateLinkRequestBody
            );

            let response = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                forwardingAutomation,
                reqheaders.user,
                reqheaders.xCorrelator,
                reqheaders.traceIndicator + "." + reqheaders.traceIndicatorIncrementer++,
                reqheaders.customerJourney
            )
            resolve(response)
        }

        catch (error) {
            reject(error);
        }
    });
}

exports.RequestForInquiringOamApprovals = async function (applicationName, releaseNumber, reqheaders) {
    return new Promise(async function (resolve, reject) {
        try {
            let createLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringOamRequestApprovals.RequestForInquiringOamApprovals";
            let inquiringOamRequestContext = applicationName + releaseNumber;
            let inquiringOamRequestRequestBody = {};
            inquiringOamRequestRequestBody.oamApprovalApplication = await HttpServerInterface.getApplicationNameAsync();
            inquiringOamRequestRequestBody.oamApprovalApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            inquiringOamRequestRequestBody.oamApprovalOperation = await operationServerInterface.getOperationNameAsync("aa-2-1-2-op-s-is-005");
            inquiringOamRequestRequestBody.oamApprovalAddress = await tcpServerInterface.getLocalAddressForForwarding();
            inquiringOamRequestRequestBody.oamApprovalPort = await tcpServerInterface.getLocalPort();
            inquiringOamRequestRequestBody.oamApprovalProtocol = await tcpServerInterface.getLocalProtocol();
            inquiringOamRequestRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(inquiringOamRequestRequestBody);

            let forwardingAutomation = new forwardingConstructAutomationInput(
                createLinkForApprovingBasicAuthRequestsForwardingName,
                inquiringOamRequestRequestBody,
                inquiringOamRequestContext
            );

            let forwardingConstructAutomationList = []
            forwardingConstructAutomationList.push(forwardingAutomation);
            let operationClientUuid = await operationuuid(forwardingConstructAutomationList, inquiringOamRequestContext)

            let response = await eventDispatcher.dispatchEvent(
                operationClientUuid,
                inquiringOamRequestRequestBody,
                reqheaders.user,
                reqheaders.xCorrelator,
                reqheaders.traceIndicator + "." + reqheaders.traceIndicatorIncrementer++,
                reqheaders.customerJourney,
                undefined,
                undefined,
                true
            );
            resolve(response)
        }
        catch (error) {
            reject(error);
        }
    });
}

exports.CreateLinkForApprovingOamRequests = async function (applicationName, releaseNumber, reqheaders) {
    return new Promise(async function (resolve, reject) {
        try {
            let createLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringOamRequestApprovals.CreateLinkForApprovingOamRequests";
            let inquiringOamRequestCreateLinkForApproveRequestBody = {};
            inquiringOamRequestCreateLinkForApproveRequestBody.servingApplicationName = await HttpServerInterface.getApplicationNameAsync();
            inquiringOamRequestCreateLinkForApproveRequestBody.servingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            inquiringOamRequestCreateLinkForApproveRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-2-op-s-is-005");
            inquiringOamRequestCreateLinkForApproveRequestBody.consumingApplicationName = applicationName
            inquiringOamRequestCreateLinkForApproveRequestBody.consumingApplicationReleaseNumber = releaseNumber
            inquiringOamRequestCreateLinkForApproveRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(inquiringOamRequestCreateLinkForApproveRequestBody);
            let forwardingAutomation = new ForwardingProcessingInput(
                createLinkForApprovingBasicAuthRequestsForwardingName,
                inquiringOamRequestCreateLinkForApproveRequestBody
            );

            let response = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                forwardingAutomation,
                reqheaders.user,
                reqheaders.xCorrelator,
                reqheaders.traceIndicator + "." + reqheaders.traceIndicatorIncrementer++,
                reqheaders.customerJourney

            )
            resolve(response)
        }
        catch (error) {
            reject(error);
        }
    });
}


async function operationuuid(forwardingConstructAutomationList, InquiringOamRequestContext) {
    let forwardingName = forwardingConstructAutomationList[0].forwardingName;
    let forwardingConstruct = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(
        forwardingName);
    let operationClientUuid;
    let fcPortList = forwardingConstruct["fc-port"];
    for (let fcPort of fcPortList) {
        let fcPortDirection = fcPort["port-direction"];
        if (fcPortDirection == FcPort.portDirectionEnum.OUTPUT) {
            let isOutputMatchesContext = await isOutputMatchesContextAsync(fcPort, InquiringOamRequestContext);
            if (isOutputMatchesContext) {
                operationClientUuid = fcPort["logical-termination-point"];
                break;
            }

        }
    }
    return operationClientUuid;
}
async function isOutputMatchesContextAsync(fcPort, context) {
    let fcLogicalTerminationPoint = fcPort["logical-termination-point"];
    let serverLtpList = await logicalTerminationPoint.getServerLtpListAsync(fcLogicalTerminationPoint);
    let httpClientUuid = serverLtpList[0];
    let applicationName = await httpClientInterface.getApplicationNameAsync(httpClientUuid);
    let releaseNumber = await httpClientInterface.getReleaseNumberAsync(httpClientUuid);
    return (context == (applicationName + releaseNumber));
}

