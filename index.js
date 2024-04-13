import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("message", (data) => {
        console.log(data);
        io.emit("message", data); // Broadcast the received message to all connected clients
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

app.get('/', function (req, res) {
    res.send("Server is running");
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
