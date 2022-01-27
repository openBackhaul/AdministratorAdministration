/**
 * @file This class provides a stub to instantiate and generate a JSONObject for a IntegerProfile<br>
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
const integerValuePath = "/core-model-1-4:control-construct/profileCollection/profile={uuid}/integer-profile-1-0:integer-profile-pac/integer-profile-configuration/integer-value";
const initialProfileSuffix = "-integer-p-0000";
/** 
 * @extends profile
 */
class IntegerProfile extends profile {
    /**
     * IntegerProfilePac class holds the following properties,<br>
     * 1. IntegerProfileCapability - class that holds the values of integer-name,unit,minimum,maximum<br>
     * 2. IntegerProfileConfiguration - class that holds the values of integer-value<br>
     */
    static IntegerProfilePac = class IntegerProfilePac {
        static profileName = profile.profileNameEnum.INTEGER_PROFILE;
        integerProfileCapability;
        integerProfileConfiguration;

        static IntegerProfileCapability = class IntegerProfileCapability {
            integerName;
            unit;
            minimum;
            maximum;
            /**
             * constructor 
             * @param {string} integerName name of the integer profile.
             * @param {string} unit unit details of individual profile.
             * @param {string} minimum minimum number of entires.
             * @param {string} maximum maximum number of entries.
             * This constructor will instantiate the integerProfileCapability class
             */
            constructor(integerName, unit, minimum, maximum) {
                this.integerName = integerName;
                this.unit = unit;
                this.minimum = minimum;
                this.maximum = maximum;
            }
        };

        static IntegerProfileConfiguration = class IntegerProfileConfiguration {
            integerValue;
            /**
             * constructor 
             * @param {string} integerValue integer value.
             * This constructor will instantiate the IntegerProfileConfiguration class
             */
            constructor(integerValue) {
                this.integerValue = integerValue;
            }
        };

        /**
         * constructor 
         * @param {string} integerName name of the integer profile.
         * @param {string} unit unit details of individual profile.
         * @param {string} minimum minimum number of entires.
         * @param {string} maximum maximum number of entries.
         * @param {string} integerValue integer value.
         * This constructor will instantiate the IntegerProfilePac class
         */
        constructor(integerName, unit, minimum, maximum,integerValue) {
            this.integerProfileCapability = new IntegerProfilePac.IntegerProfileCapability(integerName, unit, minimum, maximum);
            this.integerProfileConfiguration = new IntegerProfilePac.IntegerProfileConfiguration(integerValue);
        }
    }

    /**
         * constructor 
         * @param {string} integerName name of the integer profile.
         * @param {string} unit unit details of individual profile.
         * @param {string} minimum minimum number of entires.
         * @param {string} maximum maximum number of entries.
         * @param {string} integerValue integer value.
         * This constructor will instantiate the IntegerProfile class
         */
    constructor(uuid, integerName, unit, minimum, maximum,integerValue) {
        super(uuid, IntegerProfile.IntegerProfilePac.profileName);
        this["integer-profile-1-0:integer-profile-pac"] = new IntegerProfile.IntegerProfilePac(integerName, unit, minimum, maximum,integerValue);
    }

    /**
     * @description This function returns the maximum capability of the integet profile<br>
     * @param {String} integerName name of the integer <br>
     * @param {String} unit unit of the integer profile <br>
     * @returns {promise} returns the maximum capability<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the integer profiles from the list<br>
     * <b>step 3 :</b> get the maximum capability of the integer profile for the provided integer-name and unit <br>
     **/
    static async getMaxmimumCapability(integerName, unit) {
        return new Promise(async function (resolve, reject) {
            let maximumCapability;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance.profileName == IntegerProfile.IntegerProfilePac.profileName) {
                        let profileIntegerName = profileInstance["integer-profile-1-0:integer-profile-pac"]
                            ["integer-profile-capability"]["integer-name"];
                        let profileIntegerUnit = profileInstance["integer-profile-1-0:integer-profile-pac"]
                            ["integer-profile-capability"]["unit"];
                        if (profileIntegerName == integerName && profileIntegerUnit == unit) {
                            maximumCapability = profileInstance["integer-profile-1-0:integer-profile-pac"]
                                ["integer-profile-capability"]["maximum"];
                        }
                    }
                }
                resolve(maximumCapability);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the maximum capability of the integet profile<br>
     * @param {String} integerName name of the integer <br>
     * @param {String} unit unit of the integer profile <br>
     * @returns {promise} returns the maximum capability<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the integer profiles from the list<br>
     * <b>step 3 :</b> get the maximum capability of the integer profile for the provided integer-name and unit <br>
     **/
     static async getMaximumCapability(integerName, unit) {
        return new Promise(async function (resolve, reject) {
            let maximumCapability;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance.profileName == IntegerProfile.IntegerProfilePac.profileName) {
                        let profileIntegerName = profileInstance["integer-profile-1-0:integer-profile-pac"]
                            ["integer-profile-capability"]["integer-name"];
                        let profileIntegerUnit = profileInstance["integer-profile-1-0:integer-profile-pac"]
                            ["integer-profile-capability"]["unit"];
                        if (profileIntegerName == integerName && profileIntegerUnit == unit) {
                            maximumCapability = profileInstance["integer-profile-1-0:integer-profile-pac"]
                                ["integer-profile-capability"]["maximum"];
                        }
                    }
                }
                resolve(maximumCapability);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function returns the minimum capability of the integet profile<br>
     * @param {String} integerName name of the integer <br>
     * @param {String} unit unit of the integer profile <br>
     * @returns {promise} returns the minimum capability<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the integer profiles from the list<br>
     * <b>step 3 :</b> get the minimum capability of the integer profile for the provided integer-name and unit <br>
     **/
     static async getMinimumCapability(integerName, unit) {
        return new Promise(async function (resolve, reject) {
            let minimumCapability;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance.profileName == IntegerProfile.IntegerProfilePac.profileName) {
                        let profileIntegerName = profileInstance["integer-profile-1-0:integer-profile-pac"]
                            ["integer-profile-capability"]["integer-name"];
                        let profileIntegerUnit = profileInstance["integer-profile-1-0:integer-profile-pac"]
                            ["integer-profile-capability"]["unit"];
                        if (profileIntegerName == integerName && profileIntegerUnit == unit) {
                            minimumCapability = profileInstance["integer-profile-1-0:integer-profile-pac"]
                                ["integer-profile-capability"]["minimum"];
                        }
                    }
                }
                resolve(minimumCapability);
            } catch (error) {
                resolve(undefined);
            }
        });
    }
    /**
     * @description This function returns the uuid of the integet profile<br>
     * @param {String} integerName name of the integer <br>
     * @param {String} unit unit of the integer profile <br>
     * @returns {promise} returns the uuid<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the integer profiles from the list<br>
     * <b>step 3 :</b> get the uuid of the integer profile for the provided integer-name and unit <br>
     **/
     static async getProfileUuid(integerName, unit) {
        return new Promise(async function (resolve, reject) {
            let uuid;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance.profileName == IntegerProfile.IntegerProfilePac.profileName) {
                        let profileIntegerName = profileInstance["integer-profile-1-0:integer-profile-pac"]
                            ["integer-profile-capability"]["integer-name"];
                        let profileIntegerUnit = profileInstance["integer-profile-1-0:integer-profile-pac"]
                            ["integer-profile-capability"]["unit"];
                        if (profileIntegerName == integerName && profileIntegerUnit == unit) {
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
     * @description This function returns the integer-value of the integer profile<br>
     * @param {String} integerName name of the integer <br>
     * @param {String} unit unit of the integer profile <br>
     * @returns {promise} returns the integer-value<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b> Get profile list in profileCollection<br>
     * <b>step 2 :</b> filter the integer profiles from the list<br>
     * <b>step 3 :</b> get the integer-value of the integer profile for the provided integer-name and unit <br>
     **/
     static async getIntegerValue(integerName, unit) {
        return new Promise(async function (resolve, reject) {
            let integerValue;
            try {
                let profileList = await profileCollection.getProfileList();
                for (let i = 0; i < profileList.length; i++) {
                    let profileInstance = profileList[i];
                    if (profileInstance.profileName == IntegerProfile.IntegerProfilePac.profileName) {
                        let profileIntegerName = profileInstance["integer-profile-1-0:integer-profile-pac"]
                            ["integer-profile-capability"]["integer-name"];
                        let profileIntegerUnit = profileInstance["integer-profile-1-0:integer-profile-pac"]
                            ["integer-profile-capability"]["unit"];
                        if (profileIntegerName == integerName && profileIntegerUnit == unit) {
                            integerValue = profileInstance["integer-profile-1-0:integer-profile-pac"]
                                ["integer-profile-configuration"]["integer-value"];
                        }
                    }
                }
                resolve(integerValue);
            } catch (error) {
                resolve(undefined);
            }
        });
    }

    /**
     * @description This function sets the integer-value of the integer profile<br>
     * @param {String} integerName name of the integer <br>
     * @param {String} unit unit of the integer profile <br>
     * @returns {promise} returns true if the operation is successful<br>
     * <b><u>Procedure :</u></b><br>
     * <b>step 1 :</b>formulate the path to point to the profile instance for the provided integer-name and unit<br>
     * <b>step 2 :</b> set the new integer-value<br>
     **/
    static async setIntegerValue(integerName, unit, integerValue) {
        return new Promise(async function (resolve, reject) {
            let isUpdated = false;
            try {
                let profileUuid = await IntegerProfile.getProfileUuid(integerName, unit);
                let setIntegerValueUrl = integerValuePath.replace("{uuid}", profileUuid);
                isUpdated = await fileOperation.writeToDatabase(setIntegerValueUrl, integerValue, false);
                resolve(isUpdated);
            } catch (error) {
                resolve(isUpdated);
            }
        });
    }
}

module.exports = IntegerProfile;