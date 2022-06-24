'use strict';

const AirlineEvent = require("./events")
require('./pilot')
require('./manager')


AirlineEvent.on("new-flight",  newflight)
function newflight(payload){
   
    console.log(payload.flight);
}

AirlineEvent.on("took-off",  tookOff)
function tookOff(payload){
   
    console.log(payload.flight);
}

AirlineEvent.on("arrived",  arrivedhandel)
function arrivedhandel(payload){
  

    console.log( payload.flight);
}