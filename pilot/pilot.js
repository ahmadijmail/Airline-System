"use strict";
require("dotenv").config();
//const AirlineEvent = require("../../Airline-System/events/events");
const io = require("socket.io-client");
let host = `http://localhost:${process.env.PORT}/airline`;
const airlineconn = io.connect(host);

let host2 = `http://localhost:${process.env.PORT}/`;
const airlineconn2 = io.connect(host2);


airlineconn.on("new-flight", newFlight);
airlineconn2.emit("get_all");
airlineconn2.on("flight", handelflight);

function handelflight(flight){
  console.log(`Pilot:Sorry i didn't catch this flight ID ${flight.id} `);
  airlineconn2.emit("deleteQue",flight.id );
}

function newFlight(payload) {
  setTimeout(() => {
    console.log(`Pilot: flight with ID '${payload.Details.flightID}' took-off`);
    airlineconn.emit("took-off", payload);
    
  }, 4000);

  setTimeout(() => {
    console.log(`Pilot: flight with ID '${payload.Details.flightID}' Arrived`);
    airlineconn.emit("arrived", payload);
  }, 7000);
}
