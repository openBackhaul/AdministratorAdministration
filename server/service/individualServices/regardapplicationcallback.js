
const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const operationServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationServerInterface');
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const eventDispatcher = require('onf-core-model-ap/applicationPattern/rest/client/eventDispatcher');
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');



exports.CreateLinkForInquiringBasicAuthApprovals = async function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
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

            result = await forwardRequest(
                InquiringOamRequestCreateLinkForwardingName,
                InquiringOamRequestCreateLinkRequestBody,
                user,
                xCorrelator,
                traceIndicator,
                customerJourney
            );

            resolve(result)


        }

        catch (error) {
            reject(error);
        }
    });
}

exports.RequestForInquiringBasicAuthApprovals = async function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let result;
            let InquiringOamRequestCreateLinkForwardingName = "RegardApplicationCausesSequenceForInquiringBasicAuthRequestApprovals.RequestForInquiringBasicAuthApprovals";
            let RequestForInquiringBasicAuthCreateLinkForApproveRequestBody = {};
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.applicationName = await HttpServerInterface.getApplicationNameAsync();
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.releaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-0-op-s-is-005");
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.address = await tcpServerInterface.getLocalAddressForForwarding();
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.port = await tcpServerInterface.getLocalPort();
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody.protocol = await tcpServerInterface.getLocalProtocol();
            RequestForInquiringBasicAuthCreateLinkForApproveRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(RequestForInquiringBasicAuthCreateLinkForApproveRequestBody);
            result = await forwardRequest(
                InquiringOamRequestCreateLinkForwardingName,
                RequestForInquiringBasicAuthCreateLinkForApproveRequestBody,
                user,
                xCorrelator,
                traceIndicator,
                customerJourney
            );


        }

        catch (error) {
            reject(error);
        }
    });
}

exports.CreateLinkForApprovingBasicAuthRequests = async function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
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
            result = await forwardRequest(
                CreateLinkForApprovingBasicAuthRequestsForwardingName,
                CreateLinkForApprovingBasicAuthRequestsApproveRequestBody,
                user,
                xCorrelator,
                traceIndicator,
                customerJourney
            );

            resolve(result)


        }

        catch (error) {
            reject(error);
        }
    });
}

exports.CreateLinkForInquiringOamApprovals = async function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let result;
            let CreateLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringOamRequestApprovals.CreateLinkForInquiringOamApprovals";

            let InquiringOamRequestCreateLinkRequestBody = {};
            InquiringOamRequestCreateLinkRequestBody.servingApplicationName = applicationName;
            InquiringOamRequestCreateLinkRequestBody.servingApplicationReleaseNumber = releaseNumber;
            InquiringOamRequestCreateLinkRequestBody.operationName = operationServerInterface.getOperationNameAsync("aa-2-1-0-op-s-bm-005");
            InquiringOamRequestCreateLinkRequestBody.consumingApplicationName = await HttpServerInterface.getApplicationNameAsync();
            InquiringOamRequestCreateLinkRequestBody.consumingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            InquiringOamRequestCreateLinkRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(InquiringOamRequestCreateLinkRequestBody);
            result = await forwardRequest(
                CreateLinkForApprovingBasicAuthRequestsForwardingName,
                InquiringOamRequestCreateLinkRequestBody,
                user,
                xCorrelator,
                traceIndicator,
                customerJourney
            );
            resolve(result)


        }

        catch (error) {
            reject(error);
        }
    });
}

exports.RequestForInquiringOamApprovals = async function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let result;
            let CreateLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringOamRequestApprovals.RequestForInquiringOamApprovals";

            let InquiringOamRequestRequestBody = {};
            InquiringOamRequestRequestBody.oamApprovalApplication = await HttpServerInterface.getApplicationNameAsync();
            InquiringOamRequestRequestBody.oamApprovalApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            InquiringOamRequestRequestBody.oamApprovalOperation = await operationServerInterface.getOperationNameAsync("aa-2-1-0-op-s-is-004");
            InquiringOamRequestRequestBody.oamApprovalAddress = await tcpServerInterface.getLocalAddressForForwarding();
            InquiringOamRequestRequestBody.oamApprovalPort = await tcpServerInterface.getLocalPort();
            InquiringOamRequestRequestBody.oamApprovalProtocol = await tcpServerInterface.getLocalProtocol();
            InquiringOamRequestRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(InquiringOamRequestRequestBody);
            result = await forwardRequest(
                CreateLinkForApprovingBasicAuthRequestsForwardingName,
                InquiringOamRequestRequestBody,
                user,
                xCorrelator,
                traceIndicator,
                customerJourney
            );
            resolve(result)


        }

        catch (error) {
            reject(error);
        }
    });
}

exports.CreateLinkForApprovingOamRequests = async function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let result;
            let CreateLinkForApprovingBasicAuthRequestsForwardingName = "RegardApplicationCausesSequenceForInquiringOamRequestApprovals.CreateLinkForApprovingOamRequests";


            let InquiringOamRequestCreateLinkForApproveRequestBody = {};
            InquiringOamRequestCreateLinkForApproveRequestBody.servingApplicationName = await HttpServerInterface.getApplicationNameAsync();
            InquiringOamRequestCreateLinkForApproveRequestBody.servingApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            InquiringOamRequestCreateLinkForApproveRequestBody.operationName = await operationServerInterface.getOperationNameAsync("aa-2-1-0-op-s-is-004");;
            InquiringOamRequestCreateLinkForApproveRequestBody.consumingApplicationName = applicationName
            InquiringOamRequestCreateLinkForApproveRequestBody.consumingApplicationReleaseNumber = releaseNumber
            InquiringOamRequestCreateLinkForApproveRequestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(InquiringOamRequestCreateLinkForApproveRequestBody);
            result = await forwardRequest(
                CreateLinkForApprovingBasicAuthRequestsForwardingName,
                InquiringOamRequestCreateLinkForApproveRequestBody,
                user,
                xCorrelator,
                traceIndicator,
                customerJourney
            );
            resolve(result)


        }

        catch (error) {
            reject(error);
        }
    });
}



function forwardRequest(forwardingKindName, attributeList, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            let forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingKindName);
            let operationClientUuid = (getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance))[0];
            let result = await eventDispatcher.dispatchEvent(
                operationClientUuid,
                attributeList,
                user,
                xCorrelator,
                traceIndicator,
                customerJourney
            );


            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

function getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance) {
    let fcPortOutputLogicalTerminationPointList = [];
    let fcPortList = forwardingConstructInstance[
        onfAttributes.FORWARDING_CONSTRUCT.FC_PORT];
    for (let i = 0; i < fcPortList.length; i++) {
        let fcPort = fcPortList[i];
        let fcPortPortDirection = fcPort[onfAttributes.FC_PORT.PORT_DIRECTION];
        if (fcPortPortDirection == FcPort.portDirectionEnum.OUTPUT) {
            let fclogicalTerminationPoint = fcPort[onfAttributes.FC_PORT.LOGICAL_TERMINATION_POINT];
            fcPortOutputLogicalTerminationPointList.push(fclogicalTerminationPoint);
        }
    }
    return fcPortOutputLogicalTerminationPointList;
}
