var express = require("express");

//import chatController
var chatController = require("./../../controller/chat/chat.controller");

//define chatRouter
const chatRouter = express.Router();

/**
 * ! end point  :> /user
 *
 * @ routes :>
 *   GET   /messages/:id => get room id (sender:token , receiver:id)
 *
 */

chatRouter.get("/messages/:id", chatController.getRoomMessages);

module.exports = chatRouter;
