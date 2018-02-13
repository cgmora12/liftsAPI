'use strict';
var toJson = require('allto-json');
var fs = require('fs');

exports.getStations = function(args, res, next) {
  /**
   * parameters expected in the args:
  * name (String)
  * lift (String)
  * lift_direction (String)
  **/

  var examples = {};
  var fileName = "./prueba.csv";

  if (fs.existsSync(fileName)) {
    console.log('file exists');
    // From csv to json
    toJson.csv(fileName, function(error, result){
      try{
        // Creating json object
        result = "{ \"csv\": " + JSON.stringify(result) + " }";
        var jsonObj = JSON.parse(result);
        console.log(jsonObj);

        var jsonResult = new Object();
        jsonResult.csv = [];
        var station_number = 0;

        /*console.log(JSON.stringify(args));
        console.log(args["name"].value);
        console.log(args["lift"].value);
        console.log(args["lift_direction"].value);*/

        var nameFilter = false;
        var liftFilter = false;
        var lift_directionFilter = false;

        // Filtering results
        if(args["name"].value == undefined && args["lift"].value == undefined && args["lift_direction"].value == undefined){
          jsonResult.csv = jsonObj.csv;
        } else {
          if(args["name"].value != undefined){
            if(jsonResult.csv.length > 0 || nameFilter || liftFilter || lift_directionFilter){
              jsonObj.csv = jsonResult.csv;
              jsonResult.csv = [];
              station_number = 0;
            }
            nameFilter = true;
            for(var i in jsonObj.csv){
              if(jsonObj.csv[i][0] === args["name"].value){
                jsonResult.csv[station_number] = jsonObj.csv[i];
                station_number++;
              }
            }
          } 
          if(args["lift"].value != undefined){
            if(jsonResult.csv.length > 0 || nameFilter || liftFilter || lift_directionFilter){
              jsonObj.csv = jsonResult.csv;
              jsonResult.csv = [];
              station_number = 0;
            }
            liftFilter = true;
            for(var i in jsonObj.csv){
              if(jsonObj.csv[i][1] === args["lift"].value){
                jsonResult.csv[station_number] = jsonObj.csv[i];
                station_number++;
              }
            }
          }
          if(args["lift_direction"].value != undefined){
            if(jsonResult.csv.length > 0 || nameFilter || liftFilter || lift_directionFilter){
              jsonObj.csv = jsonResult.csv;
              jsonResult.csv = [];
              station_number = 0;
            }
            lift_directionFilter = true;
            for(var i in jsonObj.csv){
              if(jsonObj.csv[i][2] === args["lift_direction"].value){
                jsonResult.csv[station_number] = jsonObj.csv[i];
                station_number++;
              }
            }
          }
        }

        console.log(jsonResult);
        examples['application/json'] = jsonResult;
      } catch (err) {
          console.log(err);
      }

      /*if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }*/

      if(Object.keys(examples).length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
      }
      else {
        res.end();
      }
    });
  } 
  else {
        res.end();
  }
  /*var examples = {};
    examples['application/json'] = [ {
    "lift_direction" : "Down",
    "name" : "Westminster",
    "lift" : "Lift Down"
  } ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }*/
  
}

