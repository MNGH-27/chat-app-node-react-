const express = require("express");

//controller
const authController = require("./../../controller/authentication/auth.controller");

//define router
const authRouter = express.Router();

/**
 * ! end point  :> /
 *
 * @ routes :>
 *
 *
/*/

authRouter.post("/", authController.Signup);

module.exports = authRouter;
