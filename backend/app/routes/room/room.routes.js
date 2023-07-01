const express = require("express");

//controller
const roomController = require("./../../controller/room/room.controller");

//define router
const roomRouter = express.Router();

/**
 * ! end point  :> /user
 *
 * @ routes :>
 *   GET   /:id => get room id (sender:token , receiver:id)
 *   POST   /:id => get room id (sender:token , receiver:id)
 *
 */

roomRouter.get("/:id", roomController.GetRoom);
roomRouter.post("/:id", roomController.CreateNewRoom);

module.exports = roomRouter;
