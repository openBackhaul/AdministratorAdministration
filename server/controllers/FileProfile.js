'use strict';
 
var utils = require('../utils/writer.js');
var FileProfile = require('../service/FileProfileService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');
 
module.exports.getFileProfileFileDescription = async function getFileProfileFileDescription(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await FileProfile.getFileProfileFileDescription(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
 
 
module.exports.getFileProfileFileIdentifier = async function getFileProfileFileIdentifier(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await FileProfile.getFileProfileFileIdentifier(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
 
module.exports.getFileProfileFileName = async function getFileProfileFileName(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await FileProfile.getFileProfileFileName(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
 
module.exports.getFileProfileOperation = async function getFileProfileOperation(req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  await FileProfile.getFileProfileOperation(req.url)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
 
module.exports.putFileProfileFileName = async function putFileProfileFileName(req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  await FileProfile.putFileProfileFileName(req.url, body)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
 
module.exports.putFileProfileOperation = async function putFileProfileOperation(req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  await FileProfile.putFileProfileOperation(req.url, body)
    .then(function (response) {
      responseBuilder.buildResponse(res, responseCode, response);
    })
    .catch(function (response) {
      let sentResp = responseBuilder.buildResponse(res, undefined, response);
      responseCode = sentResp.code;
    });
  oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};
 