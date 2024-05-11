const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
let logicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint')
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const Regardapplicationcallback = require('./regardapplicationcallback');
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const Integerprofile = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/IntegerProfile')
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const INQUIRE_FORWARDING_NAME = "RegardApplicationCausesSequenceForInquiringBasicAuthRequestApprovals.RequestForInquiringBasicAuthApprovals"

exports.RegardapplicationUpdate = async function (applicationName, releaseNumber, reqheaders) {
    let result = {}
    let responseList;
    let traceIndicatorIncrementer = '1';

    return new Promise(async function (resolve, reject) {
        try {
            reqheaders.traceIndicatorIncrementer = traceIndicatorIncrementer;
            let maxwaitingperiod = await Integerprofile.getIntegerValueForTheIntegerProfileNameAsync("maximumWaitTimeToReceiveOperationKey")
            const opclinetUuid = await GetOperationClient(INQUIRE_FORWARDING_NAME, applicationName, releaseNumber)
            const CreateLinkForInquiringBasicAuthApprovalsrequest = await Regardapplicationcallback.CreateLinkForInquiringBasicAuthApprovals(applicationName, releaseNumber, reqheaders);
            if (CreateLinkForInquiringBasicAuthApprovalsrequest["client-successfully-added"] == false) {
                result = await InquiringOamApprovals(applicationName, releaseNumber, reqheaders)
            }
            else {
                let time = new Date()
                await OperationClientInterface.turnONNotificationChannel(time)
                let waitUntilOperationKeyIsUpdatedValue = await OperationClientInterface.waitUntilOperationKeyIsUpdated(opclinetUuid, time, maxwaitingperiod);
                await OperationClientInterface.turnOFFNotificationChannel(time)
                if (!waitUntilOperationKeyIsUpdatedValue) {
                    result["client-successfully-added"] = false
                    result["reason-of-failure"] = "MAXIMUM_WAIT_TIME_TO_RECEIVE_OPERATION_KEY_EXCEEDED"
                }
                else {

                    const RequestForInquiringBasicAuthApprovalsreq = await Regardapplicationcallback.RequestForInquiringBasicAuthApprovals(applicationName, releaseNumber, reqheaders)
                    if (!RequestForInquiringBasicAuthApprovalsreq) {
                        result = await InquiringOamApprovals(applicationName, releaseNumber, reqheaders)
                    }
                    else {
                        let attempt = 1
                        let FunctionRsult = async function (applicationName, releaseNumber, reqheaders) {
                            let isLinkCreatedDetails = await Regardapplicationcallback.CreateLinkForApprovingBasicAuthRequests(applicationName, releaseNumber, reqheaders)
                            let maximumattemp = await Integerprofile.getIntegerValueForTheIntegerProfileNameAsync("maximumNumberOfAttemptsToCreateLink")

                            if ((attempt <= maximumattemp)
                                && (isLinkCreatedDetails["client-successfully-added"] == false)
                                && ((isLinkCreatedDetails["reason-of-failure"] == "ALT_SERVING_APPLICATION_RELEASE_NUMBER_UNKNOWN")
                                    || (isLinkCreatedDetails["reason-of-failure"] == "ALT_SERVING_APPLICATION_NAME_UNKNOWN"))) {
                                attempt++
                                await FunctionRsult(applicationName, releaseNumber, reqheaders)

                            }
                            else if (isLinkCreatedDetails["client-successfully-added"] == false) {
                                result = await InquiringOamApprovals(applicationName, releaseNumber, reqheaders)
                            }
                            else {
                                let time = new Date()
                                const opclinetUuid = await GetOperationClient(INQUIRE_FORWARDING_NAME, applicationName, releaseNumber)
                                await OperationClientInterface.turnONNotificationChannel(time)
                                let waitUntilOperationKeyIsUpdatedValue = await OperationClientInterface.waitUntilOperationKeyIsUpdated(opclinetUuid, time, maxwaitingperiod);
                                await OperationClientInterface.turnOFFNotificationChannel(time)
                                if (!waitUntilOperationKeyIsUpdatedValue) {
                                    result['client-successfully-added'] = false
                                    result["reason-of-failure"] = "MAXIMUM_WAIT_TIME_TO_RECEIVE_OPERATION_KEY_EXCEEDED"

                                } else {
                                    result['client-successfully-added'] = true
                                }
                            }
                            return result
                        }

                        result = await FunctionRsult(applicationName, releaseNumber, reqheaders)

                    }
                }
            }

        } catch (error) {
            console.log(error);
            result["client-successfully-added"] = false;
            result["reason-of-failure"] = 'AA_UNKNOWN';
        }
        responseList = await FinalResult(result)
        resolve(responseList)

    });
}

async function InquiringOamApprovals(applicationName, releaseNumber, reqheaders) {
    const CreateLinkForInquiringOamApprovalsrequest = await Regardapplicationcallback.CreateLinkForInquiringOamApprovals(applicationName, releaseNumber, reqheaders)

    if (CreateLinkForInquiringOamApprovalsrequest['client-successfully-added'] == true) {
        const CreateLinkForInquiringOamApprovalsrequest = await Regardapplicationcallback.RequestForInquiringOamApprovals(applicationName, releaseNumber, reqheaders)
        let responseCode = CreateLinkForInquiringOamApprovalsrequest.status;
        if (responseCode.toString().startsWith("2")) {

            const CreateLinkForInquiringOamApprovalsrquest = await Regardapplicationcallback.CreateLinkForApprovingOamRequests(applicationName, releaseNumber, reqheaders)
            return (CreateLinkForInquiringOamApprovalsrquest)
        } else {
            return (CreateLinkForInquiringOamApprovalsrequest)
        }
    }
    else {
        return CreateLinkForInquiringOamApprovalsrequest
    }
}



async function FinalResult(Response) {


    let RegardSuccessful = {}

    if (Response['client-successfully-added'] == true) {
        RegardSuccessful.sucess = true
    }
    else {
        RegardSuccessful.sucess = false
        RegardSuccessful.reasonforFaliure = `AA_${Response['reason-of-failure']}`
    }
    if (Response.status) {
        if (Response.status.toString().startsWith("5")) {
            RegardSuccessful.success = false,
                RegardSuccessful.reasonforFaliure = "AA_UNKNOWN";
        }
        else if (Response.status.toString().startsWith("4")) {
            RegardSuccessful.success = false,
                RegardSuccessful.reasonforFaliure = "AA_NOT_REACHABLE";
        }
    }

    return RegardSuccessful;
}


async function GetOperationClient(forwardingName, applicationName, releaseNumber) {
    let forwardingConstruct = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(
        forwardingName);
    let fcPortList = forwardingConstruct["fc-port"];
    for (let fcPort of fcPortList) {
        let fcPortDirection = fcPort["port-direction"];
        if (fcPortDirection == FcPort.portDirectionEnum.OUTPUT) {
            let fcLogicalTerminationPoint = fcPort["logical-termination-point"];
            let serverLtpList = await logicalTerminationPoint.getServerLtpListAsync(fcLogicalTerminationPoint);
            let httpClientUuid = serverLtpList[0];
            let applicationNameOfClient = await HttpClientInterface.getApplicationNameAsync(httpClientUuid);
            let releaseNumberOfClient = await HttpClientInterface.getReleaseNumberAsync(httpClientUuid);
            if (applicationNameOfClient == applicationName && releaseNumberOfClient == releaseNumber) {
                return fcLogicalTerminationPoint;
            }
        }
    }
    return undefined;
}



