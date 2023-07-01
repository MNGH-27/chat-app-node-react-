const mongoose = require("mongoose");

const userSchema = require("./../user/user.schema");

const MessageSchema = mongoose.Schema({
  _id: { type: Number, default: 0 },
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
    type: Number,
  },
  senderId: {
    type: Number,
  },
  roomId: {
    type: Number,
  },
});

const RoomSchema = mongoose.Schema({
  _id: { type: Number, default: 0 },
  createAt: {
    type: Date,
    default: Date.now,
  },
  receiverId: {
    type: Number,
  },
  senderId: {
    type: Number,
  },
});

const FileSchema = mongoose.Schema({
  _id: { type: Number, default: 0 },
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
