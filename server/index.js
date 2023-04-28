import express from "express";
import http from "http";
import chalk from "chalk";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const socketio = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

socketio.on("connection", (socket) => {
  console.log(chalk.blue("New client connected", socket.id));
});

server.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}`));
});
