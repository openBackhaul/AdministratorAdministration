/**
 * @file This class provides a stub to instantiate and generate a JSONObject for a ApplicationProfile<br>
 * This class is a sub class for profile <br>
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       09.12.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 **/

'use strict';
const profile = require('../Profile');
const profileCollection = require('../ProfileCollection');
const fileOperation = require('../../../databaseDriver/JSONDriver.js');
const coreModel = require('../CoreModel');
const approvalStatusPath = "/core-model-1-4:control-construct/profile-collection/profile={uuid}/application-profile-1-0:application-profile-pac/application-profile-configuration/approval-status";

/** 
 * @extends profile
 */
class ApplicationProfile extends profile {
    /**
     * applicationProfilePac class holds the following properties,<br>
     * 1. applicationProfileCapability - class that holds the application name and release number<br>
     * 2. applicationProfileConfiguration - class that holds the application approval status<br>
     */
    static ApplicationProfilePac = class ApplicationProfilePac {
        static profileName = profile.profileNameEnum.APPLICATION_PROFILE;
        applicationProfileCapability;
        applicationProfileConfiguration;

        static ApplicationProfileCapability = class ApplicationProfileCapability {
            applicationName;
            releaseNumber;
            /**
             * constructor 
             * @param {string} applicationName name of the client application.
             * @param {string} releaseNumber release number of the client application.
             * This constructor will instantiate the applicationProfileCapability class
             */
            constructor(applicationName, releaseNumber) {
                this.applicationName = applicationName;
                this.releaseNumber = releaseNumber;
            }
        };

        static ApplicationProfileConfiguration = class ApplicationProfileConfiguration {
            approvalStatus;
            static approvalStatusEnum = {
                REGISTERED: "application-profile-1-0:APPROVAL_STATUS_TYPE_REGISTERED",
                APPROVED: "application-profile-1-0:APPROVAL_STATUS_TYPE_APPROVED",
                BARRED: "application-profile-1-0:APPROVAL_STATUS_TYPE_BARRED",
                NOT_YET_DEFINED: "application-profile-1-0:APPROVAL_STATUS_TYPE_NOT_YET_DEFINED"
            }
            /**
             * constructor 
             * @param {string} approvalStatus approval status of the application.
             * This constructor will instantiate the applicationProfileConfiguration class
             */
            constructor(approvalStatus) {
                this.approvalStatus = approvalStatus;
            }
        };

        /**
         * constructor 
         * @param {string} applicationName name of the client application.
         * @param {string} releaseNumber release number of the client application.
         * @param {string} approvalStatus approval status of the client application.
         * This constructor will instantiate the ApplicationProfilePac class
         */
        constructor(applicationName, releaseNumber, approvalStatus) {
            this.applicationProfileCapability = new ApplicationProfilePac.ApplicationProfileCapability(applicationName, releaseNumber);
            this.applicationProfileConfiguration = new ApplicationProfilePac.ApplicationProfileConfiguration(approvalStatus);
        }
    }

    /**
     * constructor 
     * @param {string} applicationName name of the client application.
     * @param {string} releaseNumber release number of the client application.
     * @param {string} approvalStatus approval status of the client application.
     * This constructor will instantiate the ApplicationProfile class
     */
    constructor(uuid, applicationName, releaseNumber, approvalStatus) {
        super(uuid, ApplicationProfile.ApplicationProfilePac.profileName);
        this["application-profile-1-0:application-profile-pac"] = new ApplicationProfile.ApplicationProfilePac(applicationName, releaseNumber, approvalStatus);
    }

    /**
     * @description This function returns the approval status for the provided application profile uuid<br>
     * @param {String} uuid uuid of the application profile<br>
     * @returns {promise} returns the approval status<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the application profiles from the list<br>
     * <b>step 3 :</b> get the approval status for the provided uuid <br>
     **/
    static async getApprovalStatusForTheUuid(uuid) {
        return new Promise(async function (resolve, reject) {
            let approvalStatus;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance["profile-name"] == ApplicationProfile.ApplicationProfilePac.profileName) {
                        let profileUuid = profileInstance["uuid"];
                        if (profileUuid == uuid) {
                            approvalStatus = profileInstance["application-profile-1-0:application-profile-pac"]
                                ["application-profile-configuration"]["approval-status"];
                        }
                    }
                }
                resolve(approvalStatus);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the application name for the provided application profile uuid<br>
     * @param {String} uuid uuid of the application profile<br>
     * @returns {promise} returns the application name<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the application profiles from the list<br>
     * <b>step 3 :</b> get the application name for the provided uuid <br>
     **/
    static async getApplicationNameForTheUuid(uuid) {
        return new Promise(async function (resolve, reject) {
            let applicationName;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance["profile-name"] == ApplicationProfile.ApplicationProfilePac.profileName) {
                        let profileUuid = profileInstance["uuid"];
                        if (profileUuid == uuid) {
                            applicationName = profileInstance["application-profile-1-0:application-profile-pac"]
                                ["application-profile-capability"]["application-name"];
                        }
                    }
                }
                resolve(applicationName);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the application release number for the provided application profile uuid<br>
     * @param {String} uuid uuid of the application profile<br>
     * @returns {promise} returns the application release number<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the application profiles from the list<br>
     * <b>step 3 :</b> get the application release number for the provided uuid <br>
     **/
    static async getApplicationReleaseNumberForTheUuid(uuid) {
        return new Promise(async function (resolve, reject) {
            let applicationReleaseNumber;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance["profile-name"] == ApplicationProfile.ApplicationProfilePac.profileName) {
                        let profileUuid = profileInstance["uuid"];
                        if (profileUuid == uuid) {
                            applicationReleaseNumber = profileInstance["application-profile-1-0:application-profile-pac"]
                                ["application-profile-capability"]["release-number"];
                        }
                    }
                }
                resolve(applicationReleaseNumber);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the approval status for the provided application and release number<br>
     * @param {String} applicationName name of the application <br>
     * @param {String} releaseNumber release number of the application <br>
     * @returns {promise} returns the approval status<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the application profiles from the list<br>
     * <b>step 3 :</b> get the approval status for the provided application-name and release-number <br>
     **/
    static async getApprovalStatus(applicationName, releaseNumber) {
        return new Promise(async function (resolve, reject) {
            let approvalStatus;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance["profile-name"] == ApplicationProfile.ApplicationProfilePac.profileName) {
                        let profileApplicationName = profileInstance["application-profile-1-0:application-profile-pac"]
                            ["application-profile-capability"]["application-name"];
                        let profileApplicationReleaseNumber = profileInstance["application-profile-1-0:application-profile-pac"]
                            ["application-profile-capability"]["release-number"];
                        if (profileApplicationName == applicationName && profileApplicationReleaseNumber == releaseNumber) {
                            approvalStatus = profileInstance["application-profile-1-0:application-profile-pac"]
                                ["application-profile-configuration"]["approval-status"];
                        }
                    }
                }
                resolve(approvalStatus);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the approval status for the provided application and release number<br>
     * @param {String} applicationName name of the application <br>
     * @param {String} releaseNumber release number of the application <br>
     * @returns {promise} returns the approval status<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile instance for the uuid using the method getProfileInstanceForTheUuid() in profileCollection<br>
     * <b>step 2 :</b> get the application name from the http-client interface capability <br>
     **/
    static async getProfileUuid(applicationName, releaseNumber) {
        return new Promise(async function (resolve, reject) {
            let uuid;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance["profile-name"] == ApplicationProfile.ApplicationProfilePac.profileName) {
                        let profileApplicationName = profileInstance["application-profile-1-0:application-profile-pac"]
                            ["application-profile-capability"]["application-name"];
                        let profileApplicationReleaseNumber = profileInstance["application-profile-1-0:application-profile-pac"]
                            ["application-profile-capability"]["release-number"];
                        if (profileApplicationName == applicationName && profileApplicationReleaseNumber == releaseNumber) {
                            uuid = profileInstance["uuid"];
                        }
                    }
                }
                resolve(uuid);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns true if a profile exists for the provided application and release number<br>
     * @param {String} applicationName name of the application <br>
     * @param {String} releaseNumber release number of the application <br>
     * @returns {promise} returns true if the profile exist<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile instance for the uuid using the method getProfileInstanceForTheUuid() in profileCollection<br>
     * <b>step 2 :</b> get the application name from the http-client interface capability <br>
     **/
    static async isProfileExists(applicationName, releaseNumber) {
        return new Promise(async function (resolve, reject) {
            let isExist = false;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance["profile-name"] == ApplicationProfile.ApplicationProfilePac.profileName) {
                        let profileApplicationName = profileInstance["application-profile-1-0:application-profile-pac"]
                            ["application-profile-capability"]["application-name"];
                        let profileApplicationReleaseNumber = profileInstance["application-profile-1-0:application-profile-pac"]
                            ["application-profile-capability"]["release-number"];
                        if (profileApplicationName == applicationName && profileApplicationReleaseNumber == releaseNumber) {
                            isExist = true;
                        }
                    }
                }
                resolve(isExist);
            } catch (error) {
                resolve(isExist);
            }
        });
    }

    /**
     * @description This function sets the approval-status for the provided application-name and release-number
     * @param {String} applicationName name of the application <br>
     * @param {String} releaseNumber release number of the application <br>
     * @param {String} approvalStatus approval status of the application <br>
     * @returns {promise} returns true if the value is set<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> formulate the path to point to the profile instance for the provided application-name and release-number<br>
     * <b>step 2 :</b> set the new approval-status<br>
     **/
    static async setApprovalStatus(applicationName, releaseNumber, approvalStatus) {
        return new Promise(async function (resolve, reject) {
            let isUpdated = false;
            try {
                let profileUuid = await ApplicationProfile.getProfileUuid(applicationName, releaseNumber);
                let setApprovalStatusUrl = approvalStatusPath.replace("{uuid}", profileUuid);
                isUpdated = await fileOperation.writeToDatabase(setApprovalStatusUrl, approvalStatus, false);
                resolve(isUpdated);
            } catch (error) {
                resolve(isUpdated);
            }
        });
    }

    /**
     * @description This function creates a new profile<br>
     * @param {String} profileName name of the profile<br>
     * @param {array} profileAttributes list of attributes for the profile creation<br>
     * @returns {promise} returns uuid of the created profile<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> get the attribute list <br>
     **/
    static async createProfile(profileAttributes) {
        return new Promise(async function (resolve, reject) {
            try {
                let uuid = await ApplicationProfile.generateNextUuid();
                let applicationName = profileAttributes["application-name"];
                let releaseNumber = profileAttributes["application-release-number"];
                let approvalStatus = profileAttributes["approval-status"];
                let applicationProfile = new ApplicationProfile(uuid, applicationName, releaseNumber, approvalStatus);
                profileCollection.addProfile(applicationProfile);
                resolve(uuid);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the next available uuid for the http-client-interface.<br>
     * @returns {promise} returns the next free uuid instance that can be used for the http-client-interface ltp creation.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> use the method getUuidListForTheProtocol() to get all the uuids for the provided layer-protocol-name <br>
     * <b>step 2 :</b> Sort the uuid list in ascending order<br>
     * <b>step 3 :</b> Get the last index of the array and add 10 <br>
     **/
    static async generateNextUuid() {
        return new Promise(async function (resolve, reject) {
            try {
                let newUuid;
                let initialProfileSuffix = "-application-p-0000";
                let uuidList = await profile.getUuidListForTheProfileName(profile.profileNameEnum.APPLICATION_PROFILE);
                if (uuidList != undefined && uuidList.length > 0) {
                    uuidList.sort();
                    let lastUuid = uuidList[uuidList.length - 1];
                    let uuidPrefix = lastUuid.substring(0, lastUuid.lastIndexOf("-") + 1);
                    let uuidNumber = lastUuid.substring(lastUuid.lastIndexOf("-") + 1, lastUuid.length);
                    newUuid = uuidPrefix + (parseInt(uuidNumber) + 1).toString().padStart(4, 0);
                } else {
                    let coreModelUuid = await coreModel.getUuid();
                    newUuid = coreModelUuid + initialProfileSuffix;
                }
                resolve(newUuid);
            } catch (error) {
                reject(undefined);
            }
        });
    }
}

module.exports = ApplicationProfile;