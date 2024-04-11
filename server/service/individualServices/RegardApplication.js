
let logicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint')
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const Regardapplicationcallback = require('./regardapplicationcallback');
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const Integerprofile = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/IntegerProfile')

exports.RegardapplicationUpdate = async function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        let result = {}
        let finalvalue;
        let maxwaitingperiod = await Integerprofile.getIntegerValueForTheIntegerProfileNameAsync("maximumWaitTimeToReceiveOperationKey")
        const opclinetUuid = await GetOperationClient(applicationName, releaseNumber)
        const CreateLinkForInquiringBasicAuthApprovalsreq = await Regardapplicationcallback.CreateLinkForInquiringBasicAuthApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney);
        if (CreateLinkForInquiringBasicAuthApprovalsreq["client-successfully-added"] == false) {
            result = await InquiringOamApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)
        }
        else {
            let time = new Date()
            await OperationClientInterface.turnONNotificationChannel(time)
            let waitUntilOperationKeyIsUpdatedval = await OperationClientInterface.waitUntilOperationKeyIsUpdated(opclinetUuid, time, maxwaitingperiod);
            await OperationClientInterface.turnOFFNotificationChannel(time)
            if (!waitUntilOperationKeyIsUpdatedval) {
                result['client-successfully-added'] = false
                result["reason-of-failure"] = "AA_MAXIMUM_WAIT_TIME_TO_RECEIVE_OPERATION_KEY_EXCEEDED"
                console.log(result)
                resolve(result)

            }
            else {

                const RequestForInquiringBasicAuthApprovalsreq = await Regardapplicationcallback.RequestForInquiringBasicAuthApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)
                if (!RequestForInquiringBasicAuthApprovalsreq.toString().startsWith("2")) {
                    result = InquiringOamApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)
                }
                else {

                    let attempt = 1
                    var FunctionRsult = async function (applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney) {
                        let isLinkCreatedDetails = await Regardapplicationcallback.CreateLinkForApprovingBasicAuthRequests(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)

                        if ((attempt <= 5)
                            && (isLinkCreatedDetails["client-successfully-added"] == false)
                            && ((isLinkCreatedDetails['reason-of-failure'] == "AA_ALT_SERVING_APPLICATION_RELEASE_NUMBER_UNKNOWN")
                                || (isLinkCreatedDetails['reason-of-failure'] == "AA_ALT_SERVING_APPLICATION_NAME_UNKNOWN"))) {
                            attempt++
                            await FunctionRsult(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)

                        }
                        else if (isLinkCreatedDetails['client-successfully-added'] == false) {
                            result = await InquiringOamApprovals(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)
                            console.log(result)
                        }
                        else {
                            let time = new Date()
                            await OperationClientInterface.turnONNotificationChannel(time)

                            let waitUntilOperationKeyIsUpdatedval = await OperationClientInterface.waitUntilOperationKeyIsUpdated(opclinetUuid, time, maxwaitingperiod);
                            await OperationClientInterface.turnOFFNotificationChannel(time)
                            if (!waitUntilOperationKeyIsUpdatedval) {
                                result['client-successfully-added'] = false
                                result["reason-of-failure"] = "AA_MAXIMUM_WAIT_TIME_TO_RECEIVE_OPERATION_KEY_EXCEEDED"

                            } else {
                                result['client-successfully-added'] = true

                            }
                        }
                        return result
                    }

                    result = await FunctionRsult(applicationName, releaseNumber, user, xCorrelator, traceIndicator, customerJourney)

                    console.log(result)
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
        console.log(CreateLinkForInquiringOamApprovalsrequest.toString().startsWith("2"))
        if (CreateLinkForInquiringOamApprovalsrequest.toString().startsWith("2")) {
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

    if (Response['client-successfully-added'] == true || Response == 204) {
        RegardSuccessful.sucess = true

    }
    else {
        RegardSuccessful.sucess = false
        RegardSuccessful.reasonforFaliure = Response["reason-for-failure"]
    }
    if
        (Response.responsecode == 401) {
        RegardSuccessful.sucess = false
        RegardSuccessful.reasonforFaliure = "UnAuthorized"

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