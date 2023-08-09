import { Server } from "socket.io";
import MessageManager from "./dao/db/message.dao.js";
const socket = {};

const messageManager = new MessageManager();

socket.connect = (httpServer) => {
  socket.io = new Server(httpServer);

  let { io } = socket;

  io.on("connection", (socket) => {
    logger.info(`${socket.id} connected`);

    // When an user sends a message, it is added to the db
    socket.on("message", async (data) => {
      // messages.push(data);
      await messageManager.createMessage(data);
      let messages = await messageManager.getMessages();
      io.emit("messageLogs", messages);
    });

    socket.on("user-autenticated", async (data) => {
      let messages = await messageManager.getMessages();
      io.emit("messageLogs", messages);
      socket.broadcast.emit("user-connected", data);
    });
  });
};

export default socket;
