/**
 * @file This module provides functionality to  check  Authorization Status 
 * @module AuthorizationApplication
 **/


const fs = require('fs');
const { getFilePath } = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/FileProfile');


const profile = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/FileProfile');
const { resolve } = require('path');

const administratorList = 'administrator-credential-list';
const authorizationValue = 'authorization';
const allowedMethodsValue = 'allowed-methods';
const fileOperation = require('onf-core-model-ap/applicationPattern/databaseDriver/JSONDriver')

/**
     * @description This function returns the approval status for the provided application .
     * @param {String} authorization : authorization code of the user , value should be Bse64 Encoding of username and password 
     * @returns {promise} string {approvalStatus}
**/


exports.isAuthorizationExistAsync = async function (authorization) {
    return new Promise(async function (resolve, reject) {
        let isAuthorizationExist = false;
        let isFileExit = false;
        let isAuthorizationFile = {};
        try {
            let applicationDataFile = await fileOperation.getApplicationDataFile()
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
            isAuthorizationFile = { isAuthorizationExist, isFileExit }
            resolve(isAuthorizationFile);
        } catch (error) {
            console.log(error);
        }
    });
}

/**
     * @description This function returns the approval status for the provided application .
     * @param {String} authorization : authorization code of the user , value should be Bse64 Encoding of username and password 
     * @param {String} allowedMethodsValue: allowedMethodsValue allowed methods as per the allowedMethodsEnum.
     * @returns string {approvalStatus}
**/

exports.isAuthorizedAsync = async function (authorization, allowedMethods) {
    return new Promise(async function (resolve, reject) {
        let isAuthorized = false;
        try {
            let applicationDataFile = await fileOperation.getApplicationDataFile()
            if (applicationDataFile !== undefined) {
                let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
                if (applicationData[administratorList]) {
                    let registeredApplicationList = applicationData[administratorList];
                    for (let i = 0; i < registeredApplicationList.length; i++) {
                        let registeredApplication = registeredApplicationList[i];
                        let _authorization = registeredApplication[authorizationValue];
                        let _allowedMethods = registeredApplication[allowedMethodsValue];
                        if (_authorization == authorization && (_allowedMethods == allowedMethods || _allowedMethods == "ALL")
                        ) {
                            isAuthorized = true;
                        }
                    }
                }
            }
            resolve(isAuthorized);
        } catch (error) {
            console.log(error);
        }
    });
}