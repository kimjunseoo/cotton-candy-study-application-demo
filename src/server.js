import "./db.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import globalRouter from "./Routers/globalRouter.js";

const app = express();
const server = http.createServer(app);
export const wsServer = new Server(server);

app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/client", express.static(__dirname+"/Client"));
app.use("/", globalRouter);

wsServer.on("connection", (socket) => {
    console.log("Someone Connected by socketIo!")
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enterRoom", (inviteCode) => {
        console.log(socket.rooms);
        socket.join(inviteCode);
        console.log(socket.rooms);

        socket.to(inviteCode).emit("welcome");
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye"));
    });
})


server.listen(3002, () => { console.log("*****HTTP/WS SERVER ON*****")});