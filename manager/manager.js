"use strict";

require("dotenv").config();
//const AirlineEvent = require('../../Airline-System/events/events')
const { faker } = require("@faker-js/faker");

const io = require("socket.io-client");
let host = `http://localhost:${process.env.PORT}/`;
const sysConnection = io.connect(host);
const airlineconn = io.connect(`${host}airline`);

setInterval(() => {
  let id = faker.datatype.number();
  let name = faker.name.findName();
  let destination = faker.address.country();

  let flight = {
    event: "new-flight",
    time: new Date(),
    Details: {
      airLine: "Royal Jordanian Airlines",
      destination: destination,
      pilot: name,
      flightID: id,
    },
  };
  console.log(
    `Manager: new flight with ID '${flight.Details.flightID}' have been scheduled`
  );
  let payload = { flight: flight, Details: flight.Details };
  sysConnection.emit("new-flight", payload);

  // console.log(payload);
}, 10000);

airlineconn.on("new-flight", (payload) => {
  setTimeout(() => {
    console.log(
      `Manager: we're greatly thankful for the amazing flight, ${payload.Details.pilot}`
    );
  }, 7010);
});
