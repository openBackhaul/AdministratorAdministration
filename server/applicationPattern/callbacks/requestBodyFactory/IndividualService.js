/**
 * @file This module provides functionality to build the request body. This file should be modified accourding to the individual service forwarding requirements  
 * This class consolidates the technology specific extensions.
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       23.09.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG* 
 **/

 'use strict';

 /**
  * This funtion formulates the request body based on the operation name and application 
  * @param {String} clientApplicationName name of the client application.
  * @param {String} operationName name of the client operation that needs to be addressed.
  * @param {String} attributeList list of attributes that needs to be included in the request body based on the operation name. 
  */
 exports.prepareRequestBody = function (clientApplicationName, operationName, attributeList) {
     return new Promise(async function (resolve, reject) {
         let httpRequestBody = {};
         try {
            if (operationName.includes("/v1/inquire-oam-request-approvals")) {
                let applicationName;
                let releaseNumber;
                let applicationAddress;
                let applicationPort;
                let approveOamRequest;
                for (let i = 0; i < attributeList.length; i++) {
                    if (attributeList[i]["name"] == "oam-approval-application") {
                        applicationName = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "oam-approval-application-release-number") {
                        releaseNumber = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "oam-approval-operation") {
                        approveOamRequest = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "oam-approval-address") {
                        applicationAddress = attributeList[i]["value"];
                    } else if (attributeList[i]["name"] == "oam-approval-port") {
                        applicationPort = attributeList[i]["value"];
                    }
                }
                httpRequestBody = {
                    "oam-approval-application": applicationName,
                    "oam-approval-application-release-number": releaseNumber,
                    "oam-approval-operation": approveOamRequest,
                    "oam-approval-address": applicationAddress,
                    "oam-approval-port": applicationPort
                }
            }  
             resolve(httpRequestBody);
         } catch (error) {
             console.log(error);
             resolve(false);
         }
     });
 }