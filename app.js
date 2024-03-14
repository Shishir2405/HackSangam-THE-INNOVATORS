const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const SerialPort = require("serialport");
const parsers = SerialPort.parsers;
const ejs = require("ejs");
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM("<!DOCTYPE html>");
global.document = dom.window.document;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use('/Assets', express.static('Assets'));


const parser = new parsers.Readline({
  delimiter: "\r\n",
});

const port = new SerialPort("COM5", {
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
});

port.pipe(parser);

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log("Node is listening to port");
});

// Move the data event listener outside of the io.on("connection", ...) block
parser.on("data", (data) => {
  console.log("Received data from port: " + data);
  io.sockets.emit("data", data);
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
