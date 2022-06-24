"use strict";

const AirlineEvent = require("./events");


AirlineEvent.on("new-flight", newFlight);

function newFlight(payload) {
  setTimeout(() => {
    console.log(`Pilot: flight with ID '${payload.Details.flightID}' took-off`);
    AirlineEvent.emit("took-off", payload);
  }, 4000);

  setTimeout(() => {
    console.log(`Pilot: flight with ID '${payload.Details.flightID}' Arrived`);
    AirlineEvent.emit("arrived", payload);
  }, 7000);
}
