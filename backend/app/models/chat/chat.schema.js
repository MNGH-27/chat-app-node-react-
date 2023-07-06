const mongoose = require("mongoose");
const userSchema = require("./../user/user.schema");

const MessageSchema = mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    default: "",
  },
  contentType: {
    type: String,
  },
  receiverId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  roomId: {
    type: String,
  },
});

const RoomSchema = mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now,
  },
  receiverId: {
    type: String,
  },
  senderId: {
    type: String,
  },
});

const FileSchema = mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now,
  },
  message: {
    type: MessageSchema,
  },
  address: {
    type: String,
  },
  type: {
    type: String,
  },
  size: {
    type: String,
  },
});

const messageSchema = mongoose.model("Message", MessageSchema);
const roomSchema = mongoose.model("Room", RoomSchema);
const fileSchema = mongoose.model("File", FileSchema);

module.exports = {
  messageSchema,
  roomSchema,
  fileSchema,
};
