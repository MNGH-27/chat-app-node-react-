const socketIo = require("socket.io");

function socketInit(server) {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("user is connected");

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
}

module.exports = {
  socketInit,
};
