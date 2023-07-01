const express = require("express");

//routers
const userRouter = require("./user/user.routes");
const authRouter = require("./authentication/auth.routes");
const chatRouter = require("./chat/chat.routes");
const roomRouter = require("./room/room.routes");
//api Router
const api = express.Router();

//app router
api.use("/user", userRouter);
api.use("/auth", authRouter);
api.use("/chat", chatRouter);
api.use("/room", roomRouter);

module.exports = api;
