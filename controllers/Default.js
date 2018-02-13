'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.getStations = function getStations (req, res, next) {
  Default.getStations(req.swagger.params, res, next);
};
