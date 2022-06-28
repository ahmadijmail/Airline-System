"use strict";
require("dotenv").config();
//const AirlineEvent = require("../../Airline-System/events/events");
const io = require("socket.io-client");
let host = `http://localhost:${process.env.PORT}/airline`;
const airlineconn = io.connect(host);

airlineconn.on("new-flight", newFlight);

// const airlineconn = io.connect(host);
// airlineconn.on("new-flight", tookof);

// function tookof(payload) {
//   setTimeout(() => {
//     console.log(`Pilot: flight with ID '${payload.Details.flightID}' took-off`);
//     sysConnection.emit("took-off", payload);
//   }, 4000);
// }

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
