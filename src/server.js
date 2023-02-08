import "./db.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const wsServer = new Server(server);

server.listen(3002, () => { console.log("*****HTTP/WS SERVER ON*****")});