const express = require("express");

//routers
const userRouter = require("./user/user.routes");
const authRouter = require("./authentication/auth.routes");

//api Router
const api = express.Router();

//app router
// api.use("/user", userRouter);
api.use("/auth", authRouter);

module.exports = api;
