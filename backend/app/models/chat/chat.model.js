const { messageSchema, chatSchema, fileSchema } = require("./chat.schema");

class Message {}

class Chat {
  constructor() {}

  static async checkChatExist(senderId, receiverId) {
    // chatSchema.find
  }
}

module.exports = {
  Message,
  Chat,
};
