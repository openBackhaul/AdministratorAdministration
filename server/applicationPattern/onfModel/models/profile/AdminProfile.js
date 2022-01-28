/**
 * @file This class provides a stub to instantiate and generate a JSONObject for a AdminProfile <br>
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
const approvalStatusPath = "/core-model-1-4:control-construct/profile-collection/profile={uuid}/admin-profile-1-0:admin-profile-pac/admin-profile-configuration/approval-status";

/** 
 * @extends profile
 */
class AdminProfile extends profile {

    /**
     * adminProfilePac class holds the following properties,<br>
     * 1. adminProfileCapability - class that holds the administrator name<br>
     * 2. adminProfileConfiguration - class that holds the userName,authorization and allowedMethods<br>
     */
    static AdminProfilePac = class AdminProfilePac {
        static profileName = profile.profileNameEnum.ADMIN_PROFILE;
        adminProfileCapability;
        adminProfileConfiguration;

        static AdminProfileCapability = class AdminProfileCapability {
            administratorName;
            /**
             * constructor 
             * @param {string} administratorName name of the administrator.
             * This constructor will instantiate the adminProfileCapability class
             */
            constructor(administratorName) {
                this.administratorName = administratorName;
            }
        };

        static AdminProfileConfiguration = class AdminProfileConfiguration {
            userName;
            authorization;
            allowedMethods;
            static allowedMethodsEnum = {
                GET: "admin-profile-1-0:ALLOWED_METHODS_TYPE_GET",
                ALL: "admin-profile-1-0:ALLOWED_METHODS_TYPE_ALL"
            }
            /**
             * constructor 
             * @param {string} userName user name of the admin.
             * @param {string} authorization Base64 decoded authorization code.
             * @param {string} allowedMethods list of allowed methods.
             * This constructor will instantiate the adminProfileConfiguration class
             */
            constructor(userName, authorization, allowedMethods) {
                this.userName = userName;
                this.authorization = authorization;
                this.allowedMethods = allowedMethods;
            }
        };

        /**
         * constructor 
         * @param {string} administratorName name of the administrator.
         * @param {string} userName user name of the admin.
         * @param {string} authorization Base64 decoded authorization code.
         * @param {string} allowedMethods list of allowed methods.
         * This constructor will instantiate the AdminProfilePac class
         */
        constructor(administratorName, userName, authorization, allowedMethods) {
            this.adminProfileCapability = new AdminProfilePac.AdminProfileCapability(administratorName);
            this.adminProfileConfiguration = new AdminProfilePac.AdminProfileConfiguration(userName, authorization, allowedMethods);
        }
    }

    /**
     * constructor 
     * @param {string} uuid unique identifier of the profile.
     * @param {string} administratorName name of the administrator.
     * @param {string} userName user name of the admin.
     * @param {string} authorization Base64 decoded authorization code.
     * @param {string} allowedMethods list of allowed methods.
     * This constructor will instantiate the AdminProfile class
     */
    constructor(uuid, administratorName, userName, authorization, allowedMethods) {
        super(uuid, AdminProfile.AdminProfilePac.profileName);
        this["admin-profile-1-0:admin-profile-pac"] = new AdminProfile.AdminProfilePac(administratorName, userName, authorization, allowedMethods);
    }

    /**
     * @description This function returns the authorization code for the provided admin profile uuid<br>
     * @param {String} uuid uuid of the admin profile<br>
     * @returns {promise} returns the authorization<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the admin profiles from the list<br>
     * <b>step 3 :</b> get the authorization code for the provided uuid <br>
     **/
    static async getAuthorizationForTheUuid(uuid) {
        return new Promise(async function (resolve, reject) {
            let authorization;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance["profile-name"] == AdminProfile.AdminProfilePac.profileName) {
                        let profileUuid = profileInstance["uuid"];
                        if (profileUuid == uuid) {
                            authorization = profileInstance["admin-profile-1-0:admin-profile-pac"]
                                ["admin-profile-configuration"]["Authorization"];
                        }
                    }
                }
                resolve(authorization);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the allowed methods for the provided admin profile uuid<br>
     * @param {String} uuid uuid of the admin profile<br>
     * @returns {promise} returns the allowed methods<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the admin profiles from the list<br>
     * <b>step 3 :</b> get the allowed methods for the provided uuid <br>
     **/
    static async getAllowedMethodsForTheUuid(uuid) {
        return new Promise(async function (resolve, reject) {
            let allowedMethods;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance["profile-name"] == AdminProfile.AdminProfilePac.profileName) {
                        let profileUuid = profileInstance["uuid"];
                        if (profileUuid == uuid) {
                            allowedMethods = profileInstance["admin-profile-1-0:admin-profile-pac"]
                                ["admin-profile-configuration"]["allowed-methods"];
                        }
                    }
                }
                resolve(allowedMethods);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the allowedMethods for the provided authorization code<br>
     * @param {String} authorization authorization code of the admin profile<br>
     * @returns {promise} returns the allowedMethods<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the admin profiles from the list<br>
     * <b>step 3 :</b> get the allowedMethods code for the provided authorization <br>
     **/
    static async getAllowedMethodsForTheAuthorization(authorization) {
        return new Promise(async function (resolve, reject) {
            let allowedMethods;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance["profile-name"] == AdminProfile.AdminProfilePac.profileName) {
                        let profileAuthorization = profileInstance["admin-profile-1-0:admin-profile-pac"]
                            ["admin-profile-configuration"]["Authorization"];
                        if (profileAuthorization == authorization) {
                            allowedMethods = profileInstance["admin-profile-1-0:admin-profile-pac"]
                                ["admin-profile-configuration"]["allowed-methods"];
                        }
                    }
                }
                resolve(allowedMethods);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns true if the provided authorization code exists<br>
     * @param {String} authorization authorization code of the admin profile<br>
     * @returns {promise} returns the true if the authorization code is available<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the admin profiles from the list<br>
     * <b>step 3 :</b> check whether the authorization code is available <br>
     **/
    static async isAuthorizationExists(authorization) {
        return new Promise(async function (resolve, reject) {
            let isExists = false;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance["profile-name"] == AdminProfile.AdminProfilePac.profileName) {
                        let profileAuthorization = profileInstance["admin-profile-1-0:admin-profile-pac"]
                            ["admin-profile-configuration"]["Authorization"];
                        if (profileAuthorization == authorization) {
                            isExists = true;
                        }
                    }
                }
                resolve(isExists);
            } catch (error) {
                resolve(false);
            }
        });
    }    

    /**
     * @description This function creates a new profile<br>
     * @param {array} profileAttributes list of attributes for the profile creation<br>
     * @returns {promise} returns uuid of the created profile<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> get the attribute list <br>
     **/
    static async createProfile(profileAttributes) {
        return new Promise(async function (resolve, reject) {
            try {
                let uuid = await AdminProfile.generateNextUuid();
                // Need to complement once the required services are added in specification
                resolve(uuid);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the next available uuid for the admin-profile.<br>
     * @returns {promise} returns the next free uuid instance that can be used for the admin-profile creation.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> use the method getUuidListForTheProfileName() to get all the uuids for the provided profile-name <br>
     * <b>step 2 :</b> Sort the uuid list in ascending order<br>
     * <b>step 3 :</b> Get the last index of the array and add 10 <br>
     **/
    static async generateNextUuid() {
        return new Promise(async function (resolve, reject) {
            try {
                let newUuid;
                let initialProfileSuffix = "-admin-p-0000";
                let uuidList = await profile.getUuidListForTheProfileName(profile.profileNameEnum.ADMIN_PROFILE);
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

module.exports = AdminProfile;