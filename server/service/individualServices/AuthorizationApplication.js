/**
 * @file This module provides functionality to  check  Authorization Status 
 * @module AuthorizationApplication
 **/
const { error } = require('console');
const fs = require('fs');
const administratorList = 'administrator-credential-list';
const allowedSccess = "allowed-access";
const authorizationValue = 'auth-code';
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
exports.isAuthorizedAsync = async function (authorization, allowedMethods) {
    try {
        let applicationDataFile = await FileprofileOperation.getApplicationDataFileContent()
        if (applicationDataFile !== undefined) {
            let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
            if (applicationData[administratorList]) {
                let registeredApplicationList = applicationData[administratorList];
                for (let i = 0; i < registeredApplicationList.length; i++) {
                    let registeredApplication = registeredApplicationList[i];
                    let _authorization = registeredApplication[authorizationValue];
                    let allowAcees = registeredApplication[allowedSccess]
                    for (let access of allowAcees) {
                        let _allowedMethodsList = access["allowed-methods"]
                        for (let _allowedMethods of _allowedMethodsList) {
                            if (_authorization == authorization && (_allowedMethods == allowedMethods || _allowedMethods == "ALL" || _allowedMethods == "*")) {
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

exports.isOpeartionisExistAsync = async function (operationName, authorization) {
    let isoperationExit = false;

    try {
        let applicationDataFile = await FileprofileOperation.getApplicationDataFileContent()
        if (applicationDataFile !== undefined) {
            let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
            if (applicationData[administratorList]) {
                let registeredApplicationList = applicationData[administratorList];
                for (let i = 0; i < registeredApplicationList.length; i++) {
                    let registeredApplication = registeredApplicationList[i];
                    let allowAcees = registeredApplication[allowedSccess]
                    let _authorization = registeredApplication[authorizationValue]
                    for (let OperationName of allowAcees) {
                        let _allowedOperationList = OperationName["allowed-operations"]
                        for (let _allowedOperation of _allowedOperationList) {
                            let OpNamelive = operationName.startsWith("/core-model-1-4:network-control-domain=live")
                            let OpNamecache = operationName.startsWith("/core-model-1-4:network-control-domain=cache")
                            if (_authorization == authorization && (_allowedOperation == operationName || OpNamecache || OpNamelive)) {
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
                    for (let applicationAndrRleaseList of allowAcees) {
                        let _applicationName = applicationAndrRleaseList["application-name"]
                        let _releaseNumber = applicationAndrRleaseList["release-number"]
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
        console.log(error);
    }
}