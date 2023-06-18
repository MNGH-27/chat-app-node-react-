const express = require("express");

//controller
const userController = require("./../../controller/user/user.controller");

//define router
const userRouter = express.Router();

/**
 * ! end point  :> /
 *
 * @ routes :>
 *
 *
 */

userRouter.use("/", userController.GetUser);

module.exports = userRouter;
