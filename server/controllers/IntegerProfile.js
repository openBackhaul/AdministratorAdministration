'use strict';

var IntegerProfile = require('../service/IntegerProfileService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');

module.exports.getIntegerProfileIntegerName = function getIntegerProfileIntegerName (req, res, next) {
    let responseCode = responseCodeEnum.code.OK;
    IntegerProfile.getIntegerProfileIntegerName(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    let sentResp = responseBuilder.buildResponse(res, undefined, response);
    responseCode = sentResp.code;
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);

};

module.exports.getIntegerProfileIntegerValue = function getIntegerProfileIntegerValue (req, res, next) {
    let responseCode = responseCodeEnum.code.OK;
    IntegerProfile.getIntegerProfileIntegerValue(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    let sentResp = responseBuilder.buildResponse(res, undefined, response);
    responseCode = sentResp.code;
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);

};

module.exports.getIntegerProfileMaximum = function getIntegerProfileMaximum (req, res, next) {
    let responseCode = responseCodeEnum.code.OK;
    IntegerProfile.getIntegerProfileMaximum(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    let sentResp = responseBuilder.buildResponse(res, undefined, response);
    responseCode = sentResp.code;
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);

};

module.exports.getIntegerProfileMinimum = function getIntegerProfileMinimum (req, res, next) {
    let responseCode = responseCodeEnum.code.OK;
    IntegerProfile.getIntegerProfileMinimum(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    let sentResp = responseBuilder.buildResponse(res, undefined, response);
    responseCode = sentResp.code;
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);

};

module.exports.getIntegerProfilePurpose = function getIntegerProfilePurpose (req, res, next) {
    let responseCode = responseCodeEnum.code.OK;
    IntegerProfile.getIntegerProfilePurpose(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    let sentResp = responseBuilder.buildResponse(res, undefined, response);
    responseCode = sentResp.code;
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);

};

module.exports.getIntegerProfileUnit = async function getIntegerProfileUnit (req, res, next) {
    let responseCode = responseCodeEnum.code.OK;
    await  IntegerProfile.getIntegerProfileUnit(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);

};

module.exports.putIntegerProfileIntegerValue = function putIntegerProfileIntegerValue (req, res, next, body) {
    let responseCode = responseCodeEnum.code.NO_CONTENT;
    IntegerProfile.putIntegerProfileIntegerValue(req.url, body)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
  .catch(function (response) {
    let sentResp = responseBuilder.buildResponse(res, undefined, response);
    responseCode = sentResp.code;
  });
oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);

};
