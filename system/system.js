"use strict";
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const ioServer = require("socket.io")(PORT);
const airline = ioServer.of("/airline");
const uuid = require("uuid").v4;

let queue = {
  flights: {},
};
airline.on("connection", (socket) => {
  console.log("Connected to Airline ", socket.id);
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
  socket.on("new-flight", newflight);
  function newflight(payload) {
    const id = uuid();
    queue.flights[id] = payload;
    console.log(payload.flight);
    airline.emit("new-flight", payload);
  }
  socket.on("get_all", () => {
    
    Object.keys(queue.flights).forEach((id) => {
      socket.emit("flight", {
        id: id,
        payload: queue.flights[id],
      });
    });
  });

  socket.on("deleteQue", (queue) => {
   delete queue.flights.id;
    console.log("unread flights done and deleted");
  });
});
