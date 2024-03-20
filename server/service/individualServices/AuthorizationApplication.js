/**
 * @file This module provides functionality to  check  Authorization Status
 * @module AuthorizationApplication
 **/
const { error } = require('console');
const fs = require('fs');
const administratorList = 'administrator-credential-list';
const allowedSccess = "allowed-access";
const authorizationValue = 'auth-code';
const allowedMethodsValue = 'allowed-methods';
const FileprofileOperation = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/FileProfile')

/**
 * @description This function returns the approval status for the provided application .
 * @param {String} authorization : authorization code of the user , value should be Bse64 Encoding of username and password
 * @returns {promise} string {approvalStatus}
**/
exports.isAuthorizationExistAsync = async function (authorization) {
    let isAuthorizationExist = false;
    let isFileExit = false;

    try {
        let applicationDataFile = await FileprofileOperation.getApplicationDataFileContent()
        if (applicationDataFile !== undefined) {
            isFileExit = true;
            let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
            if (applicationData[administratorList]) {
                let registeredApplicationList = applicationData[administratorList];
                for (let i = 0; i < registeredApplicationList.length; i++) {
                    let registeredApplication = registeredApplicationList[i];
                    let _authorization = registeredApplication[authorizationValue];

                    if (_authorization == authorization) {
                        isAuthorizationExist = true;

                    }
                }
            }
        }
        return { isAuthorizationExist, isFileExit }
    } catch (error) {
        console.log(error);
    }
}


/**
 * @description This function returns the approval status for the provided application .
 * @param {String} authorization : authorization code of the user , value should be Bse64 Encoding of username and password
 * @param {String} allowedMethodsValue: allowedMethodsValue allowed methods as per the allowedMethodsEnum.
 * @returns string {approvalStatus}
**/
exports.isAuthorizedAsync = async function (applicationName, applicationReleaseNumber, authorization, allowedMethods) {
    try {
        let applicationDataFile = await FileprofileOperation.getApplicationDataFileContent()
        if (applicationDataFile !== undefined) {
            let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
            if (applicationData[administratorList]) {
                let registeredApplicationList = applicationData[administratorList];
                for (let i = 0; i < registeredApplicationList.length; i++) {
                    let registeredApplication = registeredApplicationList[i];
                    let _authorization = registeredApplication[authorizationValue];
                    if (_authorization == authorization) {
                        const auth = await ApplicationandReleaseNumber(applicationName, applicationReleaseNumber, authorization)
                        let _allowedMethodsList = auth["allowed-methods"]
                        for (let _allowedMethods of _allowedMethodsList) {
                            if ((_allowedMethods == allowedMethods || _allowedMethods == "ALL" || _allowedMethods == "*")) {
                                return true;
                            }
                        }

                    }
                }
            }
        }

    } catch (error) {
        console.log(error);
    }
    return false;
}


exports.isOpeartionisExistAsync = async function (applicationName, applicationReleaseNumber, operationName, authorization) {
    let isoperationExit = false;

    try {
        let applicationDataFile = await FileprofileOperation.getApplicationDataFileContent()
        if (applicationDataFile !== undefined) {
            let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
            if (applicationData[administratorList]) {
                let registeredApplicationList = applicationData[administratorList];
                for (let i = 0; i < registeredApplicationList.length; i++) {
                    let registeredApplication = registeredApplicationList[i];
                    let _authorization = registeredApplication[authorizationValue]
                    if (_authorization == authorization) {
                        const auth = await ApplicationandReleaseNumber(applicationName, applicationReleaseNumber, authorization)
                        let _allowedOperationList = auth["allowed-operations"]
                        for (let _allowedOperation of _allowedOperationList) {
                            console.log(_allowedOperation)
                            let OpNamelive = operationName.startsWith("/core-model-1-4:network-control-domain=live")
                            let OpNamecache = operationName.startsWith("/core-model-1-4:network-control-domain=cache")
                            if ((_allowedOperation == operationName || OpNamecache || OpNamelive)) {
                                isoperationExit = true;
                                break;
                            }

                        }
                    }

                }
            }
        }
        return isoperationExit;
    } catch (error) {
        console.log(error);
    }
}




exports.IsApplicationExists = async function (applicationaName, ReleaseNumber, authorization) {
    let isApplicationNameExit = false
    let isReleaseNumberExit = false
    try {
        let applicationDataFile = await FileprofileOperation.getApplicationDataFileContent()
        if (applicationDataFile !== undefined) {
            let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
            if (applicationData[administratorList]) {
                let registeredApplicationList = applicationData[administratorList];
                for (let i = 0; i < registeredApplicationList.length; i++) {
                    let registeredApplication = registeredApplicationList[i];
                    let _authorization = registeredApplication[authorizationValue]
                    let allowAcees = registeredApplication[allowedSccess]
                    for (let ApandreleaseList of allowAcees) {
                        let _applicationName = ApandreleaseList["application-name"]
                        let _releaseNumber = ApandreleaseList["release-number"]
                        if (_authorization == authorization && (_applicationName == applicationaName || _applicationName == "*")) {
                            isApplicationNameExit = true
                            if (_authorization == authorization && (_releaseNumber == ReleaseNumber || _releaseNumber == "*")) {
                                isReleaseNumberExit = true

                            }
                        }

                    }

                }
            }
        }
        return { isApplicationNameExit, isReleaseNumberExit }
    }
    catch (err) {

    }
}

async function ApplicationandReleaseNumber(applicationaName, ReleaseNumber, authorization) {
    let isApplicationNameExit = {}

    try {
        let applicationDataFile = await FileprofileOperation.getApplicationDataFileContent()
        if (applicationDataFile !== undefined) {
            let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
            if (applicationData[administratorList]) {
                let registeredApplicationList = applicationData[administratorList];
                for (let i = 0; i < registeredApplicationList.length; i++) {
                    let registeredApplication = registeredApplicationList[i];
                    let _authorization = registeredApplication[authorizationValue]
                    let allowAcees = registeredApplication[allowedSccess]
                    for (let ApandreleaseList of allowAcees) {
                        let _applicationName = ApandreleaseList["application-name"]
                        let _releaseNumber = ApandreleaseList["release-number"]
                        if (_authorization == authorization && (_applicationName == applicationaName || _applicationName == "*") && (_releaseNumber == ReleaseNumber || _releaseNumber == "*")) {
                            isApplicationNameExit = ApandreleaseList
                        }

                    }

                }
            }
        }
        return isApplicationNameExit
    }
    catch (err) {

    }
}







