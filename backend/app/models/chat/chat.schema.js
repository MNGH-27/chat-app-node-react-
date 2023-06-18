const mongoose = require("mongoose");

const userSchema = require("./../user/user.schema");

const MessageSchema = mongoose.Schema({
  _id: { type: Number, default: 0 },
  createdAt: {
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
  receiver: {
    type: userSchema,
  },
  sender: {
    type: userSchema,
  },
});

const ChatSchema = mongoose.Schema({
  _id: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  receiver: {
    type: userSchema,
  },
  sender: {
    type: userSchema,
  },
});

const FileSchema = mongoose.Schema({
  _id: { type: Number, default: 0 },
  createdAt: {
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
const chatSchema = mongoose.model("Chat", ChatSchema);
const fileSchema = mongoose.model("File", FileSchema);

module.exports = {
  messageSchema,
  chatSchema,
  fileSchema,
};
