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

const connected = new Set();

socketio.on("connection", (socket) => {
  console.log(chalk.blue("Client connected", socket.id));
  connected.add(socket.id);
  socket.on("message", (message) => {
    console.log(chalk.blue("New message", message));
    // read all connected clients
    connected.forEach((id) => {
      if (id !== socket.id) {
        console.log(id);
        socket.to(id).emit("message", message);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log(chalk.red("Client disconnected", socket.id));
    connected.delete(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(chalk.green(`Server is running on port ${PORT}`));
});
