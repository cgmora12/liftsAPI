'use strict';
var toJson = require('allto-json');
var fs = require('fs');
/**
 * Find lifts by station name
 * Returns the lifts found in a station
 *
 * name String Name of the station where it is
 * returns List
 **/
exports.getLiftsByStationName = function(name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if(name == 'Westminster'){
      examples['application/json'] = [ {
        "clear_marked" : true,
        "working" : true,
        "direction" : "Up"
      } ];
    } else if (name == 'Victoria'){
      examples['application/json'] = [ {
        "clear_marked" : true,
        "working" : true,
        "direction" : "Up"
      }, {
        "clear_marked" : true,
        "working" : false,
        "direction" : "Down"
      } ];
    }
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Finds all stations with lifts
 * Return all station names
 *
 * returns List
 **/
exports.getStations = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    /*examples['application/json'] = [ {
      "lifts_number" : 0,
      "name" : "Westminster"
    }, {
      "lifts_number" : 0,
      "name" : "Westminster"
    } ];*/
    console.log('starting getStations');

    if (fs.existsSync('./tfl-lu-station-accessibility-lifts.xls')) {
      console.log('file exists');
      toJson.xls(('./tfl-lu-station-accessibility-lifts.xls'), function(error, result){
        console.log(result);
        //examples['application/json'] = result;
        examples['application/json'] = [ {
          "lifts_number" : 1,
          "name" : "Westminster"
        }, {
          "lifts_number" : 2,
          "name" : "Victoria"
        } ];
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
      });
    }
  });
}

