const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
let logicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint')
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const Regardapplicationcallback = require('./regardapplicationcallback');
const Integerprofile = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/IntegerProfile')
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const operationKeyUpdateNotificationService = require('onf-core-model-ap/applicationPattern/onfModel/services/OperationKeyUpdateNotificationService');
const ProfileCollection = require('onf-core-model-ap/applicationPattern/onfModel/models/ProfileCollection');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes')
const INQUIRE_FORWARDING_NAME = "RegardApplicationCausesSequenceForInquiringBasicAuthRequestApprovals.RequestForInquiringBasicAuthApprovals"
const StringProfile = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/StringProfile')

exports.RegardapplicationUpdate = async function (applicationName, releaseNumber, reqheaders) {
    let result = {}
    let responseList;
    var traceIndicatorIncrementer = reqheaders.lengthOftheForwarding + 1;

    return new Promise(async function (resolve) {
        let time = new Date()
        operationKeyUpdateNotificationService.turnONNotificationChannel(time)
        try {
            reqheaders.traceIndicatorIncrementer = traceIndicatorIncrementer;

            let maxwaitingperiod = await Integerprofile.getIntegerValueForTheIntegerProfileNameAsync("maximumWaitTimeToReceiveOperationKey")
            const opclinetUuid = await GetOperationClient(INQUIRE_FORWARDING_NAME, applicationName, releaseNumber)
            result = await Regardapplicationcallback.CreateLinkForInquiringBasicAuthApprovals(applicationName, releaseNumber, reqheaders);
            if (result.status.toString().startsWith('2')) {
                if (result.data["client-successfully-added"] == false) {
                    result = await InquiringOamApprovals(applicationName, releaseNumber, reqheaders)
                } else {

                    let waitUntilOperationKeyIsUpdatedValue = await operationKeyUpdateNotificationService.waitUntilOperationKeyIsUpdated(opclinetUuid, time, maxwaitingperiod);
                    if (!waitUntilOperationKeyIsUpdatedValue) {
                        result.data["client-successfully-added"] = false
                        result.data["reason-of-failure"] = "MAXIMUM_WAIT_TIME_TO_RECEIVE_OPERATION_KEY_EXCEEDED"
                    } else {
                        const requestForInquiringBasicAuthApprovalsreq = await Regardapplicationcallback.RequestForInquiringBasicAuthApprovals(applicationName, releaseNumber, reqheaders)
                        if (!requestForInquiringBasicAuthApprovalsreq) {
                            result = await InquiringOamApprovals(applicationName, releaseNumber, reqheaders)
                        } else {
                            let attempt = 1;
                            let maximumattemp = await Integerprofile.getIntegerValueForTheIntegerProfileNameAsync("maximumNumberOfAttemptsToCreateLink")
                            let FunctionResult = async function (applicationName, releaseNumber, reqheaders) {
                                let isLinkCreatedDetails = await Regardapplicationcallback.CreateLinkForApprovingBasicAuthRequests(
                                    applicationName,
                                    releaseNumber,
                                    reqheaders)

                                if (isLinkCreatedDetails.status.toString().startsWith('2')) {
                                    if ((attempt <= maximumattemp) &&
                                        (isLinkCreatedDetails["client-successfully-added"] == false)) {
                                        attempt++
                                        await FunctionResult(applicationName, releaseNumber, reqheaders)
                                    } else if (isLinkCreatedDetails["client-successfully-added"] == false) {
                                        result = await InquiringOamApprovals(applicationName, releaseNumber, reqheaders)
                                    }
                                    else {
                                        const operationServerUuidOfApproveBasicAuthRequest = "aa-2-1-2-op-s-is-005";
                                        let waitUntilOperationKeyIsUpdatedValue = await operationKeyUpdateNotificationService.waitUntilOperationKeyIsUpdated(operationServerUuidOfApproveBasicAuthRequest, time, maxwaitingperiod);
                                        if (!waitUntilOperationKeyIsUpdatedValue) {
                                            result.data['client-successfully-added'] = false
                                            result.data["reason-of-failure"] = "MAXIMUM_WAIT_TIME_TO_RECEIVE_OPERATION_KEY_EXCEEDED"
                                        } else {
                                            result.data['client-successfully-added'] = true
                                        }
                                    }
                                }
                                else {
                                    result = isLinkCreatedDetails;
                                }
                                return result
                            }
                            result = await FunctionResult(applicationName, releaseNumber, reqheaders)
                        }
                    }
                }
            }
            operationKeyUpdateNotificationService.turnOFFNotificationChannel(time)
        }
        catch (error) {
            console.log(error);
            result["client-successfully-added"] = false;
            result["reason-of-failure"] = 'UNKNOWN';
        }
        responseList = await FinalResult(result)
        resolve(responseList)

    });
}


async function InquiringOamApprovals(applicationName, releaseNumber, reqheaders) {
    let createLinkForInquiringOamApprovalsRequest = await Regardapplicationcallback.CreateLinkForInquiringOamApprovals(applicationName, releaseNumber, reqheaders)
    if (createLinkForInquiringOamApprovalsRequest.status.toString().startsWith('2') && createLinkForInquiringOamApprovalsRequest.data['client-successfully-added'] == true) {
        let requestForInquiringOamApprovals = await Regardapplicationcallback.RequestForInquiringOamApprovals(applicationName, releaseNumber, reqheaders)
        let responseCode = requestForInquiringOamApprovals.status;
        if (responseCode.toString().startsWith("2")) {
          const createLinkForApprovingOamRequest= await Regardapplicationcallback.CreateLinkForApprovingOamRequests(applicationName, releaseNumber, reqheaders)
            return (createLinkForApprovingOamRequest)
        } else {
            return (requestForInquiringOamApprovals)
        }
    } else {
        return createLinkForInquiringOamApprovalsRequest
    }
}



async function FinalResult(response) {
    let result = { successfullyConnected: false };
    let responseCode = response.status;
    if (responseCode == undefined) {
        if (response["client-successfully-added"]) {
            result.successfullyConnected = response["client-successfully-added"]
        } else {
            result.successfullyConnected = response["client-successfully-added"],
                result.reasonForFailure = `AA_${response['reason-of-failure']}`;
        }
    }
    else if (responseCode.toString().startsWith("2")) {
        let responseData = response.data
        if (responseData['client-successfully-added'] == true) {
            result.successfullyConnected = true
        } else {
            result.reasonForFailure = `AA_${responseData['reason-of-failure']}`;
        }
    }
    else if (responseCode == 408 || responseCode == 503 || responseCode == 404) {
        let urlPath = response.url.split("/")
        let operationName = urlPath[urlPath.length - 1]

        if (operationName == "add-operation-client-to-link") {
        result.reasonForFailure = "AA_DID_NOT_REACH_ALT"}
        else{
            result.reasonForFailure = "AA_DID_NOT_REACH_NEW_APPLICATION"
        }
    }
    else if (responseCode.toString().startsWith("4")) {
        result.reasonForFailure = "AA_UNKNOWN";
    }
    else if (responseCode.toString().startsWith("5")) {
        result.reasonForFailure = "AA_ALT_UNKNOWN";
    }

    return result;
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



exports.getStringValueAndPattern = async function (stringProfilename) {
    let stringValue;
    let profileList = await ProfileCollection.getProfileListForProfileNameAsync(StringProfile.profileName);
    if (profileList === undefined) {
        return undefined;
    }
    for (let profile of profileList) {
        let stringProfilePac = profile[onfAttributes.STRING_PROFILE.PAC]
        let stringProfileCapability = stringProfilePac[onfAttributes.STRING_PROFILE.CAPABILITY]
        let stringName = stringProfileCapability[onfAttributes.STRING_PROFILE.STRING_NAME]
        let StringProfileConfiguration = stringProfilePac[onfAttributes.STRING_PROFILE.CONFIGURATION]
        stringValue = StringProfileConfiguration[onfAttributes.STRING_PROFILE.STRING_VALUE]
        if (stringName == stringProfilename) {
            return {
                stringValue
            }
        }
    }

}