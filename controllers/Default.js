'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.getLondonUndergrounLifts = function getLondonUndergrounLifts (req, res, next) {
  Default.getLondonUndergrounLifts(req.swagger.params, res, next);
};
