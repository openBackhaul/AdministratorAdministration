const ForwardingProcessingInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/forwardingConstruct/ForwardingProcessingInput');

const ForwardingConstructProcessingService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructProcessingServices');
const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const operationServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationServerInterface');
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const eventDispatcher = require('onf-core-model-ap/applicationPattern/rest/client/eventDispatcher');
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const forwardingConstructAutomationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/forwardingConstruct/AutomationInput');
const httpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const logicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint');

const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');


exports.CreateLinkForInquiringBasicAuthApprovals = async function (applicationName, releaseNumber, reqheaders) {
    return new Promise(async function (resolve, reject) {
        try {
            let result;
            let InquiringOamRequestCreateLinkForwardingName = "RegardApplicationCausesSequenceForInquiringBasicAuthRequestApprovals.CreateLinkForInquiringBasicAuthApprovals";
            let InquiringOamRequestCreateLinkRequestBody = {};

            InquiringOamRequestCreateLinkRequestBody.servingApplicationName = applicationName;
            InquiringOamRequestCreateLinkRequestBody.servingApplicationReleaseNumber = releaseNumber;
            InquiringOamRequestCreateLinkRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-0-op-s-bm-012");
            InquiringOamRequestCreateLinkRequestBody.consumingApplicationName = await HttpServerInterface.getApplicationNameAsync();
            InquiringOamRequestCreateLinkRequestBody.consumingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();

            InquiringOamRequestCreateLinkRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(InquiringOamRequestCreateLinkRequestBody);
            let forwardingAutomation = new ForwardingProcessingInput(
                InquiringOamRequestCreateLinkForwardingName,
                InquiringOamRequestCreateLinkRequestBody
            );

            let response = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                forwardingAutomation,
                reqheaders.user,
                reqheaders.xCorrelator,
                reqheaders.traceIndicator + "." + reqheaders.traceIndicatorIncrementer++,
                reqheaders.customerJourney

            )

            resolve(response.data)

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
            let InquiringOamRequestCreateLinkForwardingName = "RegardApplicationCausesSequenceForInquiringBasicAuthRequestApprovals.RequestForInquiringBasicAuthApprovals";
            let InquiringOamRequestContext = applicationName + releaseNumber;
            let RequestForInquiringBasicAuthCreateLinkForApproveRequestBody = {};
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.applicationName = await HttpServerInterface.getApplicationNameAsync();
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.releaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-0-op-s-is-005");
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.address = await tcpServerInterface.getLocalAddressForForwarding();
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.port = await tcpServerInterface.getLocalPort();
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.protocol = await tcpServerInterface.getLocalProtocol();
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(RequestForInquiringBasicAuthCreateLinkForApproveRequestBody);

            let forwardingAutomation = new forwardingConstructAutomationInput(
                InquiringOamRequestCreateLinkForwardingName,
                RequestForInquiringBasicAuthCreateLinkForApproveRequestBody,
                InquiringOamRequestContext
            );

            let forwardingConstructAutomationList = []
            forwardingConstructAutomationList.push(forwardingAutomation);
            let operationClientUuid = await operationuuid(forwardingConstructAutomationList, InquiringOamRequestContext)
            result = await eventDispatcher.dispatchEvent(
                operationClientUuid,
                RequestForInquiringBasicAuthCreateLinkForApproveRequestBody,
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
            let result;
            let CreateLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringBasicAuthRequestApprovals.CreateLinkForApprovingBasicAuthRequests";
            let CreateLinkForApprovingBasicAuthRequestsApproveRequestBody = {};
            CreateLinkForApprovingBasicAuthRequestsApproveRequestBody.servingApplicationName = await HttpServerInterface.getApplicationNameAsync();
            CreateLinkForApprovingBasicAuthRequestsApproveRequestBody.servingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            CreateLinkForApprovingBasicAuthRequestsApproveRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-0-op-s-is-005");
            CreateLinkForApprovingBasicAuthRequestsApproveRequestBody.consumingApplicationName = applicationName
            CreateLinkForApprovingBasicAuthRequestsApproveRequestBody.consumingApplicationReleaseNumber = releaseNumber
            CreateLinkForApprovingBasicAuthRequestsApproveRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(CreateLinkForApprovingBasicAuthRequestsApproveRequestBody);

            let forwardingAutomation = new ForwardingProcessingInput(
                CreateLinkForApprovingBasicAuthRequestsForwardingName,
                CreateLinkForApprovingBasicAuthRequestsApproveRequestBody
            );

            let response = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                forwardingAutomation,
                reqheaders.user,
                reqheaders.xCorrelator,
                reqheaders.traceIndicator + "." + reqheaders.traceIndicatorIncrementer++,
                reqheaders.customerJourney

            )

            resolve(response.data)


        }

        catch (error) {
            reject(error);
        }
    });
}

exports.CreateLinkForInquiringOamApprovals = async function (applicationName, releaseNumber, reqheaders) {
    return new Promise(async function (resolve, reject) {
        try {

            let CreateLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringOamRequestApprovals.CreateLinkForInquiringOamApprovals";

            let InquiringOamRequestCreateLinkRequestBody = {};
            InquiringOamRequestCreateLinkRequestBody.servingApplicationName = applicationName;
            InquiringOamRequestCreateLinkRequestBody.servingApplicationReleaseNumber = releaseNumber;
            InquiringOamRequestCreateLinkRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-0-op-s-bm-005");
            InquiringOamRequestCreateLinkRequestBody.consumingApplicationName = await HttpServerInterface.getApplicationNameAsync();
            InquiringOamRequestCreateLinkRequestBody.consumingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            InquiringOamRequestCreateLinkRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(InquiringOamRequestCreateLinkRequestBody);
            let forwardingAutomation = new ForwardingProcessingInput(
                CreateLinkForApprovingBasicAuthRequestsForwardingName,
                InquiringOamRequestCreateLinkRequestBody
            );

            let response = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                forwardingAutomation,
                reqheaders.user,
                reqheaders.xCorrelator,
                reqheaders.traceIndicator + "." + reqheaders.traceIndicatorIncrementer++,
                reqheaders.customerJourney

            )


            resolve(response.data)


        }

        catch (error) {
            reject(error);
        }
    });
}

exports.RequestForInquiringOamApprovals = async function (applicationName, releaseNumber, reqheaders) {
    return new Promise(async function (resolve, reject) {
        try {
            let result;
            let CreateLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringOamRequestApprovals.RequestForInquiringOamApprovals";
            let InquiringOamRequestContext = applicationName + releaseNumber;
            let InquiringOamRequestRequestBody = {};
            InquiringOamRequestRequestBody.oamApprovalApplication = await HttpServerInterface.getApplicationNameAsync();
            InquiringOamRequestRequestBody.oamApprovalApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            InquiringOamRequestRequestBody.oamApprovalOperation = await operationServerInterface.getOperationNameAsync("aa-2-1-0-op-s-is-004");
            InquiringOamRequestRequestBody.oamApprovalAddress = await tcpServerInterface.getLocalAddressForForwarding();
            InquiringOamRequestRequestBody.oamApprovalPort = await tcpServerInterface.getLocalPort();
            InquiringOamRequestRequestBody.oamApprovalProtocol = await tcpServerInterface.getLocalProtocol();
            InquiringOamRequestRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(InquiringOamRequestRequestBody);

            let forwardingAutomation = new forwardingConstructAutomationInput(
                CreateLinkForApprovingBasicAuthRequestsForwardingName,
                InquiringOamRequestRequestBody,
                InquiringOamRequestContext
            );

            let forwardingConstructAutomationList = []
            forwardingConstructAutomationList.push(forwardingAutomation);
            let operationClientUuid = await operationuuid(forwardingConstructAutomationList, InquiringOamRequestContext)

            response = await eventDispatcher.dispatchEvent(
                operationClientUuid,
                InquiringOamRequestRequestBody,
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
            let CreateLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringOamRequestApprovals.CreateLinkForApprovingOamRequests";
            let InquiringOamRequestCreateLinkForApproveRequestBody = {};
            InquiringOamRequestCreateLinkForApproveRequestBody.servingApplicationName = await HttpServerInterface.getApplicationNameAsync();
            InquiringOamRequestCreateLinkForApproveRequestBody.servingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            InquiringOamRequestCreateLinkForApproveRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-0-op-s-is-004");;
            InquiringOamRequestCreateLinkForApproveRequestBody.consumingApplicationName = applicationName
            InquiringOamRequestCreateLinkForApproveRequestBody.consumingApplicationReleaseNumber = releaseNumber
            InquiringOamRequestCreateLinkForApproveRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(InquiringOamRequestCreateLinkForApproveRequestBody);
            let forwardingAutomation = new ForwardingProcessingInput(
                CreateLinkForApprovingBasicAuthRequestsForwardingName,
                InquiringOamRequestCreateLinkForApproveRequestBody
            );

            let response = await ForwardingConstructProcessingService.processForwardingConstructAsync(
                forwardingAutomation,
                reqheaders.user,
                reqheaders.xCorrelator,
                reqheaders.traceIndicator + "." + reqheaders.traceIndicatorIncrementer++,
                reqheaders.customerJourney

            )

            resolve(response.data)


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

