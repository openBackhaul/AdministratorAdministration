/**
 * @file The Profile class models the component that represents a profile and further this class will be  
 * the opportunity to enable forwarding (of specific transport characteristic information at one or more protocol layers) between points.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

'use strict';

const profileCollection = require("./ProfileCollection");


class Profile {

    uuid;
    profileName;

    static profileNameEnum = {
        APPLICATION_PROFILE: "application-profile-1-0:PROFILE_NAME_TYPE_APPLICATION_PROFILE",
        INTEGER_PROFILE: "integer-profile-1-0:PROFILE_NAME_TYPE_INTEGER_PROFILE",
        OAM_RECORD_PROFILE: "oam-record-profile-1-0:PROFILE_NAME_TYPE_OAM_RECORD_PROFILE",
        SERVICE_RECORD_PROFILE: "service-record-profile-1-0:PROFILE_NAME_TYPE_SERVICE_RECORD_PROFILE",
        ADMIN_PROFILE: "admin-profile-1-0:PROFILE_NAME_TYPE_ADMIN_PROFILE"
    }
    /**
     * @constructor 
     * @param {String} profileList list of profiles.
     **/
    constructor(uuid, profileName) {
        this.uuid = uuid;
        this.profileName = profileName;
    }

    /**
     * @description This function returns the list of profile uuid for the provided profile-name.<br>
     * @param {String} profileNameType name of the profile<br>
     * @returns {promise} returns profile uuid List.<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get the profile list from the profileCollection<br>
     * <b>step 2 :</b> Iterate through the list and filter the uuids for the required profileName<br>
     **/
    static async getUuidListForTheProfileName(profileNameType) {
        return new Promise(async function (resolve, reject) {
            let filteredProfileUuidList = [];
            try {
                let profileList = await profileCollection.getProfileList();
                if (profileList != undefined) {
                    for (let i = 0; i < profileList.length; i++) {
                        let profileInstanceName = profileList[i]["profile-name"];
                        if (profileInstanceName != undefined) {
                            if (profileInstanceName == profileNameType) {
                                filteredProfileUuidList.push(profileList[i]["uuid"]);
                            }
                        }
                    }
                }
                resolve(filteredProfileUuidList);
            } catch (error) {
                resolve(undefined);
            }
        });
    }
}

module.exports = Profile;