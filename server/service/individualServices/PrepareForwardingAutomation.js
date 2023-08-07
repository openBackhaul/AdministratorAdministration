const forwardingConstructAutomationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/forwardingConstruct/AutomationInput');
const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const onfFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const prepareALTForwardingAutomation = require('onf-core-model-ap-bs/basicServices/services/PrepareALTForwardingAutomation');
const operationServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationServerInterface');
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');

exports.regardApplication = function (logicalTerminationPointconfigurationStatus, forwardingConstructConfigurationStatus, applicationName, releaseNumber) {
    return new Promise(async function (resolve, reject) {
        let forwardingConstructAutomationList = [];
        try {
            /***********************************************************************************
             * NewApplicationCausesRequestForInquiringOamRequestApprovals /v1/inquire-oam-request-approvals
             ************************************************************************************/
            let InquiringOamRequestForwardingName = "NewApplicationCausesRequestForInquiringOamRequestApprovals";
            let InquiringOamRequestContext = applicationName + releaseNumber;
            let InquiringOamRequestRequestBody = {};
            InquiringOamRequestRequestBody.oamApprovalApplication = await HttpServerInterface.getApplicationNameAsync();
            InquiringOamRequestRequestBody.oamApprovalApplicationReleaseNumber = await HttpServerInterface.getReleaseNumberAsync();
            InquiringOamRequestRequestBody.oamApprovalOperation = await operationServerInterface.getOperationNameAsync("aa-2-0-1-op-s-is-004");
            InquiringOamRequestRequestBody.oamApprovalAddress = await tcpServerInterface.getLocalAddressForForwarding();
            InquiringOamRequestRequestBody.oamApprovalPort = await tcpServerInterface.getLocalPort();
            InquiringOamRequestRequestBody.oamApprovalProtocol = await tcpServerInterface.getLocalProtocol();
            InquiringOamRequestRequestBody = onfFormatter.modifyJsonObjectKeysToKebabCase(InquiringOamRequestRequestBody);
            let forwardingAutomation = new forwardingConstructAutomationInput(
                InquiringOamRequestForwardingName,
                InquiringOamRequestRequestBody,
                InquiringOamRequestContext
            );
            forwardingConstructAutomationList.push(forwardingAutomation);

            /***********************************************************************************
             * forwardings for application layer topology
             ************************************************************************************/
            let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTForwardingAutomationInputAsync(
                logicalTerminationPointconfigurationStatus,
                forwardingConstructConfigurationStatus
            );

            if (applicationLayerTopologyForwardingInputList) {
                for (let i = 0; i < applicationLayerTopologyForwardingInputList.length; i++) {
                    let applicationLayerTopologyForwardingInput = applicationLayerTopologyForwardingInputList[i];
                    forwardingConstructAutomationList.push(applicationLayerTopologyForwardingInput);
                }
            }

            resolve(forwardingConstructAutomationList);
        } catch (error) {
            reject(error);
        }
    });
}

exports.disregardApplication = function (logicalTerminationPointconfigurationStatus, forwardingConstructConfigurationStatus) {
    return new Promise(async function (resolve, reject) {
        let forwardingConstructAutomationList = [];
        try {

            /***********************************************************************************
             * forwardings for application layer topology
             ************************************************************************************/
            let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTUnConfigureForwardingAutomationInputAsync(
                logicalTerminationPointconfigurationStatus,
                forwardingConstructConfigurationStatus
            );

            if (applicationLayerTopologyForwardingInputList) {
                for (let i = 0; i < applicationLayerTopologyForwardingInputList.length; i++) {
                    let applicationLayerTopologyForwardingInput = applicationLayerTopologyForwardingInputList[i];
                    forwardingConstructAutomationList.push(applicationLayerTopologyForwardingInput);
                }
            }

            resolve(forwardingConstructAutomationList);
        } catch (error) {
            reject(error);
        }
    });
}

exports.bequeathYourDataAndDie = function (logicalTerminationPointconfigurationStatus) {
    return new Promise(async function (resolve, reject) {
        let forwardingConstructAutomationList = [];
        try {

            /***********************************************************************************
             * forwardings for application layer topology
             ************************************************************************************/
            let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTForwardingAutomationInputAsync(
                logicalTerminationPointconfigurationStatus,
                undefined
            );

            if (applicationLayerTopologyForwardingInputList) {
                for (let i = 0; i < applicationLayerTopologyForwardingInputList.length; i++) {
                    let applicationLayerTopologyForwardingInput = applicationLayerTopologyForwardingInputList[i];
                    forwardingConstructAutomationList.push(applicationLayerTopologyForwardingInput);
                }
            }

            resolve(forwardingConstructAutomationList);
        } catch (error) {
            reject(error);
        }
    });
}

exports.OAMLayerRequest = async function (uuid) {
    let forwardingConstructAutomationList = [];
    let applicationLayerTopologyForwardingInputList = await prepareALTForwardingAutomation.getALTForwardingAutomationInputForOamRequestAsync(
        uuid
    );
    if (applicationLayerTopologyForwardingInputList) {
        for (let i = 0; i < applicationLayerTopologyForwardingInputList.length; i++) {
            let applicationLayerTopologyForwardingInput = applicationLayerTopologyForwardingInputList[i];
            forwardingConstructAutomationList.push(applicationLayerTopologyForwardingInput);
        }
    }
    return forwardingConstructAutomationList;
}

