const express = require("express");

//controller
const userController = require("./../../controller/user/user.controller");

//define router
const userRouter = express.Router();

/**
 * ! end point  :> /user
 *
 * @ routes :>
 *      / => get current users data
 *      /receiver => for request for other users data to start chat
 *
 */

userRouter.get("/", userController.GetUser);
userRouter.get("/receiver", userController.GetUserByName);

module.exports = userRouter;
