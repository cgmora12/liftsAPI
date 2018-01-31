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
    console.log('starting getStations');

    if (fs.existsSync('./prueba.xls')) {
      console.log('file exists');
      
      // From xls to json
      toJson.xls(('./prueba.xls'), function(error, result){
        try {
          console.log("JSON (string) inicial: " + result);
          
          //Parsing json malformed to correct json
          result = "{" + result.substring(result.indexOf("Sheets:"), result.indexOf("'!range'")-10) + " } } }";

          var objKeysRegex = /({|,)(?:\s*)(?:')?([A-Za-z_$\.][A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):/g;
          var newQuotedKeysString = result.replace(objKeysRegex, "$1 \"$2\":");
          var objValuesRegex = /:(?:\s*)?([A-Za-z0-9_\-\.$]*)(?:\s*)(]|}|,)/g;
          var newQuotedValuesString = newQuotedKeysString.replace(objValuesRegex, ": \"$1\"$2");
          var resultJsonString = newQuotedValuesString.replace(/'/g, "\"");

          console.log("JSON (objeto) creado: " + resultJsonString);
          var jsonObj = JSON.parse(resultJsonString);
          var sheet = jsonObj.Sheets.Stations;
          console.log(sheet.A3.v);

          examples['application/json'] = sheet;
        } catch (err) {
            console.log(err)
        }
        /*examples['application/json'] = 
          [ {
            "lifts_number" : 1,
            "name" : "Westminster"
          }, {
            "lifts_number" : 2,
            "name" : "Victoria"
          } ];*/
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
      });

    }
  });
}

