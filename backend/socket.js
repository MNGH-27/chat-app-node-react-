const { Server } = require("socket.io");

function serverHandler(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["POST", "GET"],
    },
  });

  //handle on connect to server
  io.on("connection", (socket) => {
    console.log("conected to server");

    io.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
}

module.exports = serverHandler;
