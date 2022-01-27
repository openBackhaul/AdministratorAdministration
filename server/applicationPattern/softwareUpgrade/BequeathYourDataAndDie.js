/**
 * @file This module provides functionality to migrate the data from the current version to the next version. 
 * This file should be modified accourding to the individual service forwarding requirements 
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       07.12.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 * @module SoftwareUpgrade
 **/

const forwardingConstruct = require('../onfModel/models/ForwardingConstruct');
const operationClientInterface = require('../onfModel/models/layerprotocols/OperationClientInterface');
const logicalTerminationPoint = require('../onfModel/models/logicalTerminationPoint');
const httpServerInterface = require('../onfModel/models/layerprotocols/HttpServerInterface');
const httpClientInterface = require('../onfModel/models/layerprotocols/HttpClientInterface');
const tcpClientInterface = require('../onfModel/models/layerprotocols/TcpClientInterface');
const forwardingConstructService = require('../onfModel/services/ForwardingConstructService');
const profile = require("../onfModel/models/Profile");
const applicationProfile = require('../onfModel/models/profile/ApplicationProfile');


/**
 * This method performs the set of procedure to transfer the data from this version to next version of the application<br>
 * @param {String} user String User identifier from the system starting the service call
 * @param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator String Sequence of request numbers along the flow
 * @param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * @returns {boolean} return true if the operation is success or else return false<br>
 * The following are the list of forwarding-construct that will be automated to transfer the data from this current release to next release
 * 1. promptForBequeathingDataCausesMethod1
 * 2. promptForBequeathingDataCausesMethod2
 * 3. ********
 * 4. ********
 * *******
 * *******
 */
exports.upgradeSoftwareVersion = async function (user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        try {
            await promptForBequeathingDataCausesMethod1(user, xCorrelator, traceIndicator, customerJourney);
            await promptForBequeathingDataCausesMethod2(user, xCorrelator, traceIndicator, customerJourney);
            resolve();
        } catch (error) {
            reject();
        }
    });
}

/**
 * Prepare attributes and automate promptForBequeathingDataCausesMethod1<br>
 * @param {String} user String User identifier from the system starting the service call
 * @param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator String Sequence of request numbers along the flow
 * @param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * @returns {boolean} return true if the operation is success or else return false<br> 
 */
async function promptForBequeathingDataCausesMethod1(user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        
    });
}

/**
 * Prepare attributes and automate promptForBequeathingDataCausesMethod2<br>
 * @param {String} user String User identifier from the system starting the service call
 * @param {String} xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator String Sequence of request numbers along the flow
 * @param {String} customerJourney String Holds information supporting customer’s journey to which the execution applies
 * @returns {boolean} return true if the operation is success or else return false<br> 
 */
async function promptForBequeathingDataCausesMethod2(user, xCorrelator, traceIndicator, customerJourney) {
    return new Promise(async function (resolve, reject) {
        
    });
}
