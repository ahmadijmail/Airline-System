"use strict";
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const ioServer = require("socket.io")(PORT);
const airline = ioServer.of("/airline");



airline.on("connection", (socket) => {
    console.log("Connected to Airline ", (socket.id));
        socket.on("took-off", tookOff);
        function tookOff(payload) {
          console.log(payload.flight);
        }
    
      socket.on("arrived", arrivedhandel);
      function arrivedhandel(payload) {
        console.log(payload.flight);
      }
    });

ioServer.on("connection", (socket) => {
console.log("Connected to Manager");

  socket.on("new-flight", newflight);
  function newflight(payload) {
    console.log(payload.flight);
    airline.emit("new-flight", payload)
  }

 
});
