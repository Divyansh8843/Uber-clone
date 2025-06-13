const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");
let io = null;
function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`${userType} joined as ${userId}`);
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!location || !location.lng || !location.ltd) {
        socket.emit("error", { message: "Invalid location data" });
        return;
      }
      console.log(`${userId} updated location as  ${location}`);
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
  console.log("Socket.IO initialized");
}

function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    console.log(`${socketId} send message as ${messageObject}`);
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.IO not initialized");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
