//models
const { Room } = require("./../../models/chat/chat.model");

/**
 *
 * @param {id} res /:id => receiver id
 * @param {*} req
 */
async function GetRoom(req, res) {
  //get receiver id
  const receiverId = req.params.id;
  //check if we have id
  if (!receiverId) {
    return res.status(400).send({
      message: "receiver id must be send in params",
    });
  }

  //create instance of room class
  const room = new Room();

  try {
    const existedRoom = await room.checkRoomExist(req.user._id, receiverId);

    //check existedRoom
    if (existedRoom === null) {
      //return error 404
      return res.status(404).send({
        message: "there is no any room between this two users",
      });
    } else {
      //return saved room
      return res.send(existedRoom);
    }
  } catch (error) {
    console.log("error in get Room : ", error);
    return res.status(500).send({
      message: error || "error in create getRoom",
    });
  }
}

async function CreateNewRoom(req, res) {
  //get receiver id
  const receiverId = req.params.id;
  //check if we have id
  if (!receiverId) {
    return res.status(400).send({
      message: "receiver id must be send in params",
    });
  }

  //create instance of room class
  const room = new Room();

  try {
    //check if there is room between two users
    const existedRoom = await room.checkRoomExist(req.user._id, receiverId);

    //check existedRoom
    if (existedRoom) {
      //existedRoom !== null => return error =>  there is room
      return res.status(404).send({
        message: "there is room between this two users",
      });
    }

    //craete new Room
    const newRoom = await room.createNewRoom(
      req.user._id,
      receiverId,
      new Date()
    );

    console.log("newRoom : ", newRoom);

    //return saved room
    return res.status(201).send(newRoom);
  } catch (error) {
    console.log("error in get Room : ", error);
    return res.status(500).send({
      message: error || "error in create getRoom",
    });
  }
}

module.exports = {
  GetRoom,
  CreateNewRoom,
};
