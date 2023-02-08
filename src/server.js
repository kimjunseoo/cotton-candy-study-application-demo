import "./db.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import globalRouter from "./Routers/globalRouter.js";

const app = express();
const server = http.createServer(app);
const wsServer = new Server(server);

app.set("views", __dirname + "/views");
app.use("/", globalRouter);

server.listen(3002, () => { console.log("*****HTTP/WS SERVER ON*****")});