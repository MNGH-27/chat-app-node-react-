//socket server
const { Server } = require("socket.io");

//DB models
const { Message, Room } = require("./app/models/chat/chat.model");

function serverHandler(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["POST", "GET"],
    },
  });

  //handle on connect to server
  io.on("connection", (socket) => {
    socket.on("joinRoom", (roomId) => {
      //create room with roomId
      socket.join(roomId);
    });

    socket.on("newMessage", async (data) => {
      //save message in DB
      const message = new Message();

      console.log("in the new message");

      try {
        const newMessage = await message.createNewMessage(
          data.roomId,
          data.senderId,
          data.receiverId,
          new Date(),
          data.message,
          "text"
        );

        console.log("this is new MEssage : ", newMessage);
      } catch (error) {
        console.log("error in save new Message :", error);

        //send error to this room
        socket.to(data.roomId).emit("error", error);
      }

      //send message to receiver too
      socket.to(data.roomId).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
}

module.exports = serverHandler;
