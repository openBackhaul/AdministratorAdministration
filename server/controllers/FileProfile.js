'use strict';

var utils = require('../utils/writer.js');
var FileProfile = require('../service/FileProfileService');
var responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var oamLogService = require('onf-core-model-ap/applicationPattern/services/OamLogService');

module.exports.getFileProfileFileDescription = function getFileProfileFileDescription (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  FileProfile.getFileProfileFileDescription(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};


module.exports.getFileProfileFileIdentifier = function getFileProfileFileIdentifier (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  FileProfile.getFileProfileFileIdentifier(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getFileProfileFilePath = function getFileProfileFilePath (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  FileProfile.getFileProfileFilePath(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getFileProfileOperation = function getFileProfileOperation (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  FileProfile.getFileProfileOperation(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getFileProfilePassword = function getFileProfilePassword (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  FileProfile.getFileProfilePassword(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.getFileProfileUserName = function getFileProfileUserName (req, res, next, uuid) {
  let responseCode = responseCodeEnum.code.OK;
  FileProfile.getFileProfileUserName(req.url)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putFileProfileFilePath = function putFileProfileFilePath (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT; 
  FileProfile.putFileProfileFilePath(req.url,body)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putFileProfileOperation = function putFileProfileOperation (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT; 
  FileProfile.putFileProfileOperation(req.url,body)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putFileProfilePassword = function putFileProfilePassword (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT; 
  FileProfile.putFileProfilePassword(req.url,body)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};

module.exports.putFileProfileUserName = function putFileProfileUserName (req, res, next, body, uuid) {
  let responseCode = responseCodeEnum.code.NO_CONTENT; 
  FileProfile.putFileProfileUserName(req.url,body)
  .then(function (response) {
    responseBuilder.buildResponse(res, responseCode, response);
  })
    .catch(function (response) {
      responseCode = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
      responseBuilder.buildResponse(res, responseCode, response);
    });
    oamLogService.recordOamRequest(req.url, req.body, responseCode, req.headers.authorization, req.method);
};