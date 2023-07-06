const { Chat, Message } = require("./../../models/chat/chat.model");

async function getRoomMessages(req, res) {
  //get room id
  const roomId = req.params.id;
  //check if we have id
  if (!roomId) {
    return res.status(400).send({
      message: "room id must be send in params",
    });
  }

  const message = new Message();

  try {
    const messagesList = await message.getAllMessagesOfRoom(roomId);

    console.log("messageList : ", messagesList);

    res.send(messagesList);
  } catch (error) {
    console.log("error in get all messages : ", error);
    return res.status(500).send({
      message: error || "error in get all messages",
    });
  }
}

module.exports = {
  getRoomMessages,
};
