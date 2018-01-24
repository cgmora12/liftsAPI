'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.getLiftsByStationName = function getLiftsByStationName (req, res, next) {
  var name = req.swagger.params['name'].value;
  Default.getLiftsByStationName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getStations = function getStations (req, res, next) {
  Default.getStations()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
