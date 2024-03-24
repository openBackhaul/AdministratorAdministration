
let logicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint')
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const Regardapplicationcallback = require('./regardapplicationcallback');
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');

exports.RegardapplicationUpdate = async function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        let result = {}
        let finalvalue;
        const opclinetUuid = await GetOperationClient(applicationName, releaseNumber)
        const CreateLinkForInquiringBasicAuthApprovalsreq = await Regardapplicationcallback.CreateLinkForInquiringBasicAuthApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney);
        if (CreateLinkForInquiringBasicAuthApprovalsreq["client-successfully-added"] == false) {
            result = await InquiringOamApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)
        }
        else {
            let time = new Date()
            let timestampOfCurrentRequest = time.getTime()
            let waitUntilOperationKeyIsUpdated1 = true
            //await waitUntilOperationKeyIsUpdated(opclinetUuid, timestampOfCurrentRequest, waitTime);
            if (!waitUntilOperationKeyIsUpdated1) {
                result['client-successfully-added'] = true
                result["reason-of-failure"] = "AA_MAXIMUM_WAIT_TIME_TO_RECEIVE_OPERATION_KEY_EXCEEDED"

            }
            else {
                const RequestForInquiringBasicAuthApprovalsreq = await Regardapplicationcallback.RequestForInquiringBasicAuthApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)
                if (!RequestForInquiringBasicAuthApprovalsreq) {
                    //RequestForInquiringBasicAuthApprovalsreq.responsecode.toString().startsWith("2")
                    result = InquiringOamApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)
                }
                else {

                    let attempt = 1

                    async function Regard(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {

                        let isLinkCreatedDetails = await Regardapplicationcallback.CreateLinkForApprovingBasicAuthRequests(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)

                        if (attempt <= 5 && isLinkCreatedDetails["client-successfully-added"] == false && (isLinkCreatedDetails['reason-for-failure'] == "AA_ALT_SERVING_APPLICATION_RELEASE_NUMBER_UNKNOWN" || isLinkCreatedDetails['reason-for-failure'] == "AA_ALT_SERVING_APPLICATION_NAME_UNKNOWN")) {
                            attempt++
                            Regard(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)

                        } else if (isLinkCreatedDetails['client-successfully-added'] == false) {
                            result = await InquiringOamApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)
                            return result;
                        }
                        else {
                            let time = new Date()
                            let timestampOfCurrentRequest = time.getTime()
                            let waitUntilOperationKeyIsUpdated1 = false
                            //await waitUntilOperationKeyIsUpdated(opclinetUuid, timestampOfCurrentRequest, waitTime);
                            if (!waitUntilOperationKeyIsUpdated1) {
                                result['client-successfully-added'] = false
                                result["reason-of-failure"] = "AA_MAXIMUM_WAIT_TIME_TO_RECEIVE_OPERATION_KEY_EXCEEDED"
                                return result;
                            } else {
                                result['client-successfully-added'] = true
                                return result;
                            }
                        }
                    }

                    result = await Regard(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)

                }
            }
        }

        finalvalue = await FinalResult(result)
        resolve(finalvalue)

    });
}

async function InquiringOamApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
    const CreateLinkForInquiringOamApprovalsrequest = await Regardapplicationcallback.CreateLinkForInquiringOamApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)

    if (CreateLinkForInquiringOamApprovalsrequest['client-successfully-added'] == true) {
        const CreateLinkForInquiringOamApprovalsrequest = await Regardapplicationcallback.RequestForInquiringOamApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)
        if (!CreateLinkForInquiringOamApprovalsrequest) {
            //.responseCode.toString().startsWith("2")
            const CreateLinkForInquiringOamApprovalsrquest = await Regardapplicationcallback.CreateLinkForApprovingOamRequests(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)
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

    if (Response['client-successfully-added'] || Response) {
        RegardSuccessful.sucess = true

    }
    else {
        RegardSuccessful.sucess = false
        RegardSuccessful.reasonforFaliure = Response["reason-for-failure"]
    }

    if
        (Response.responsecode == 401) {
        RegardSuccessful.sucess = false
        RegardSuccessful.reasonforFaliure = ""

    }

    else if
        (Response.responsecode == 408) {
        RegardSuccessful.sucess = false
        RegardSuccessful.reasonforFaliure = "AA_NOT_REACHABLE"

    }
    return RegardSuccessful;
}

async function GetOperationClient(applicationName, releaseNumber) {
    let OperationClinetUUid;
    let httpclient = await HttpClientInterface.getHttpClientUuidAsync(applicationName, releaseNumber)
    let clientLtpList = await logicalTerminationPoint.getClientLtpListAsync(httpclient);
    for (let op = 0; op <= clientLtpList.length - 1; op++) {
        let operationName = await OperationClientInterface.getOperationNameAsync(clientLtpList[op])
        if (operationName == "/v1/inquire-basic-auth-approvals") {
            OperationClinetUUid = clientLtpList[op];
        }
    }
    return OperationClinetUUid;
}