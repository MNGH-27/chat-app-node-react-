const express = require("express");

//controller
const userController = require("./../../controller/user/user.controller");

//define router
const userRouter = express.Router();

/**
 * ! end point  :> /user
 *
 * @ routes :>
 *
 *
 */

userRouter.get("/", userController.GetUser);
userRouter.get("/receiver", userController.GetUserByName);

module.exports = userRouter;
