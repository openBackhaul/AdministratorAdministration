'use strict';
var IndividualServices = require('../service/IndividualServicesService');
var responseCodeEnum = require('../applicationPattern/rest/server/ResponseCode');
var restResponseHeader = require('../applicationPattern/rest/server/ResponseHeader');
var restResponseBuilder = require('../applicationPattern/rest/server/ResponseBuilder');
var executionAndTraceService = require('../applicationPattern/logging/ExecutionAndTraceService');

module.exports.approveOamRequest = async function approveOamRequest(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  try {
    let startTime = process.hrtime();
    let responseCode = responseCodeEnum.code.OK;
    let responseBodyToDocument = {};
    await IndividualServices.approveOamRequest(body, user, originator, xCorrelator, traceIndicator, customerJourney)
      .then(async function (responseBody) {
        responseBodyToDocument = responseBody;
        let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
        restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
      })
      .catch(async function (response) {
        responseBodyToDocument = responseBody;
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
        restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
      });
    executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
  } catch (error) {}
};

module.exports.bequeathYourDataAndDie = function bequeathYourDataAndDie(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  IndividualServices.bequeathYourDataAndDie(body, user, originator, xCorrelator, traceIndicator, customerJourney)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.disregardApplication = async function disregardApplication(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  try {
    let startTime = process.hrtime();
    let responseCode = responseCodeEnum.code.NO_CONTENT;
    let responseBodyToDocument = {};
    await IndividualServices.disregardApplication(body, user, originator, xCorrelator, traceIndicator, customerJourney, req.url)
      .then(async function (responseBody) {
        responseBodyToDocument = responseBody;
        let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
        restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
      })
      .catch(async function (response) {
        responseBodyToDocument = responseBody;
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
        restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
      });
    executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
  } catch (error) {}
};

module.exports.listApplications = async function listApplications(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  try {
      let startTime = process.hrtime();
      let responseCode = responseCodeEnum.code.OK;
      let responseBodyToDocument = {};
      await IndividualServices.listApplications(user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (responseBody) {
          responseBodyToDocument = responseBody;
          let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
          restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
        })
        .catch(async function (response) {
          responseBodyToDocument = responseBody;
          responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
          let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
          restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
        });
      executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
    } catch (error) {}
};

module.exports.regardApplication = async function regardApplication(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  try {
    let startTime = process.hrtime();
    let responseCode = responseCodeEnum.code.NO_CONTENT;
    let responseBodyToDocument = {};
    await IndividualServices.regardApplication(body, user, originator, xCorrelator, traceIndicator, customerJourney, req.url)
      .then(async function (responseBody) {
        responseBodyToDocument = responseBody;
        let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
        restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
      })
      .catch(async function (response) {
        responseBodyToDocument = responseBody;
        responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
        let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
        restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
      });
    executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
  } catch (error) {}
};

module.exports.startApplicationInGenericRepresentation = async function startApplicationInGenericRepresentation(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  try {
      let startTime = process.hrtime();
      let responseCode = responseCodeEnum.code.OK;
      let responseBodyToDocument = {};
      await IndividualServices.startApplicationInGenericRepresentation(user, originator, xCorrelator, traceIndicator, customerJourney)
        .then(async function (responseBody) {
          responseBodyToDocument = responseBody;
          let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
          restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
        })
        .catch(async function (response) {
          responseBodyToDocument = responseBody;
          responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
          let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
          restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
        });
      executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
    } catch (error) {}
};