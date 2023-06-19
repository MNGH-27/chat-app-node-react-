var express = require("express");

//import chatController
var chatController = require("./../../controller/chat/chat.controller");

//define chatRouter
const chatRouter = express.Router();

chatRouter.post("/", chatController.PostNewMessageHandler);

module.exports = chatRouter;
