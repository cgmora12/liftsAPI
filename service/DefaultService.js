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
    var fileName = "./prueba.xml";

    if (fs.existsSync(fileName)) {
      console.log('file exists');

      // From xml to json
      toJson.xml(fileName, function(error, result){
        try{
          // Creating json object
          //console.log(result);
          result = "{ \"json\": " + JSON.stringify(result) + "}";
          var jsonObj = JSON.parse(result);
          console.log(jsonObj);

          var jsonResult = new Object();
          jsonResult.json = [];
          var station_number = 0;

          // Filtering results
          for(var i in jsonObj.json.Stations.Station){
            if(jsonObj.json.Stations.Station[i].StationName[0] === name){
              jsonResult.json[station_number] = jsonObj.json.Stations.Station[i];
              station_number++;
            }
          }

          examples['application/json'] = jsonResult.json;
        } catch (err) {
            console.log(err);
        }

        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
      });

      // From csv to json
      /*toJson.csv(fileName, function(error, result){
        try{
          // Creating json object
          result = "{ \"csv\": " + JSON.stringify(result) + " }";
          var jsonObj = JSON.parse(result);
          console.log(jsonObj);

          var jsonResult = new Object();
          jsonResult.csv = [];
          var station_number = 0;

          // Filtering results
          for(var i in jsonObj.csv){
            if(jsonObj.csv[i][0] === name){
              jsonResult.csv[station_number] = jsonObj.csv[i];
              station_number++;
            }
          }

          console.log(jsonResult);
          examples['application/json'] = jsonResult;
        } catch (err) {
            console.log(err);
        }

        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
      });*/
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
    var fileName = "./prueba.xml";

    if (fs.existsSync(fileName)) {
      console.log('file exists');

      // From xml to json
      toJson.xml(fileName, function(error, result){
        try{
          // Creating json object
          //console.log(result);
          result = "{ \"json\": " + JSON.stringify(result) + "}";
          var jsonObj = JSON.parse(result);
          console.log(jsonObj);
          examples['application/json'] = jsonObj.json.Stations.Station;
        } catch (err) {
            console.log(err);
        }

        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
      });

      // From csv to json
      /*toJson.csv(fileName, function(error, result){
        try{
          // Creating json object
          result = "{ \"csv\": " + JSON.stringify(result) + " }";
          var jsonObj = JSON.parse(result);
          console.log(jsonObj);
          examples['application/json'] = jsonObj;
        } catch (err) {
            console.log(err);
        }

        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
      });*/
      
      // From xls to json
      /*toJson.xls(('./prueba.xls'), function(error, result){
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
            console.log(err);
        }
        if (Object.keys(examples).length > 0) {
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          resolve();
        }
      });*/

      /*examples['application/json'] = 
        [ {
          "lifts_number" : 1,
          "name" : "Westminster"
        }, {
          "lifts_number" : 2,
          "name" : "Victoria"
        } ];*/

    }
  });
}

