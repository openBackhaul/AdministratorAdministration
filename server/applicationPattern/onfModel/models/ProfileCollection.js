/**
 * @file The Profile class models the component that represents a profile and further this class will be  
 * the opportunity to enable forwarding (of specific transport characteristic information at one or more protocol layers) between points.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';

const fileOperation = require('../../databaseDriver/JSONDriver');
const utility = require('../utility/OnfAttributeFormatter');
const profilePath = "/core-model-1-4:control-construct/profile-collection/profile";

class ProfileCollection {

    profileList;

    /**
     * @constructor 
     * @param {String} profileList list of profiles.
     **/
    constructor(profileList) {
        this.profileList = profileList;
    }

    /**
     * @description This function returns an instance from the profile list for the provided uuid<br>
     * @param {String} uuid uuid of the profile instance that needs to be retrieved<br>
     * @returns {promise} returns profile instance<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> returns the requested profile from the path /core-model-1-4:control-construct/profile-collection/profile in the load file<br>
     **/
    static async getProfileInstanceForTheUuid(uuid) {
        return new Promise(async function (resolve, reject) {
            try {
                let profileList = await fileOperation.readFromDatabase(profilePath);
                if (profileList != undefined) {
                    for (let i = 0; i < profileList.length; i++) {
                        let profileInstance = profileList[i];
                        let profileInstanceUuid = profileInstance["uuid"];
                        if (profileInstanceUuid == uuid) {
                            resolve(profileInstance);
                        }
                    }
                }
                resolve(undefined);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns true if the profile uuid exists in the profile list<br>
     * @param {String} profileUuid uuid of the profile instance that needs to be retrieved<br>
     * @returns {promise} returns true if the profile uuid exists in the profile list<br>
     **/
    static async isProfileExists(profileUuid) {
        return new Promise(async function (resolve, reject) {
            let isExists = false;
            try {
                let profileList = await fileOperation.readFromDatabase(profilePath);
                if (profileList != undefined) {
                    for (let i = 0; i < profileList.length; i++) {
                        let profileInstance = profileList[i];
                        let profileInstanceUuid = profileInstance["uuid"];
                        if (profileInstanceUuid == profileUuid) {
                            isExists = true;
                        }
                    }
                }
                resolve(isExists);
            } catch (error) {
                resolve(isExists);
            }
        });
    }

    /**
     * @description This function returns the profile list<br>
     * @returns {promise} returns profile instance<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> returns the profile list in the path /core-model-1-4:control-construct/profile-collection/profile in the load file<br>
     **/
    static async getProfileList() {
        return new Promise(async function (resolve, reject) {
            try {
                let profileList = await fileOperation.readFromDatabase(profilePath);
                if (profileList != undefined) {
                    resolve(profileList);
                } else {
                    resolve(undefined);
                }
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function includes a instance to the profile list<br>
     * @param {applicationProfile} profileInstance profile instance to be included<br>
     * @returns {promise} returns true if the operation is success<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> add the profile instance to the path /core-model-1-4:control-construct/profile-collection/profile in the load file<br>
     **/
    static async addProfile(profileInstance) {
        return new Promise(async function (resolve, reject) {
            let isCreated = false;
            try {
                profileInstance = utility.modifyJsonObjectKeysToKebabCase(profileInstance);
                isCreated = await fileOperation.writeToDatabase(profilePath, profileInstance, true);
                resolve(isCreated);
            } catch (error) {
                resolve(false);
            }
        });
    }

    /**
     * @description This function deletes a new profile<br>
     * @param {String} profileUuid uuid of the profile<br>
     * @returns {promise} returns true if the operation is successful<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> formulates the url path and deleted the entry from the profile list <br>
     **/
    static async deleteProfile(profileUuid) {
        return new Promise(async function (resolve, reject) {
            let isDeleted = false;
            try {
                let isProfileExists = await ProfileCollection.isProfileExists(profileUuid);
                if (isProfileExists) {
                    isDeleted = await fileOperation.deletefromDatabase(profilePath + "=" + profileUuid, profileUuid, true);
                }
                resolve(isDeleted);
            } catch (error) {
                resolve(isDeleted);
            }
        });
    }

}

module.exports = ProfileCollection;