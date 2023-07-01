const { response } = require("express");
const { messageSchema, roomSchema, fileSchema } = require("./chat.schema");

class Message {}

class Room {
  constructor(recieverId, senderId, id, createdAt) {
    this.recieverId = recieverId;
    this.senderId = senderId;
    this.id = id;
    this.createdAt = createdAt;
  }

  async checkRoomExist(senderId, receiverId) {
    return await new Promise((res, rej) => {
      roomSchema
        .findOne({
          $or: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        })
        .then((response) => {
          res({
            id: response._id,
            senderId: response.senderId,
            receiverId: response.receiverId,
            createdAt: response.createdAt,
          });
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async createNewRoom(senderId, receiverId, createdAt) {
    //get number of room
    const roomCount = await this.getRoomCount();

    return await new Promise((res, rej) => {
      roomSchema
        .create({
          _id: roomCount,
          senderId: senderId,
          receiverId,
          createdAt,
        })
        .then((response) => {
          //return result as response
          res({
            senderId: response.senderId,
            receiverId: response.receiverId,
            id: response._id,
            createAt: response.createAt,
          });
        })
        .catch((err) => {
          //catch error if there would be error
          rej(err);
        });
    });
  }

  async getRoomCount() {
    //request for number of data
    return await new Promise((res, rej) =>
      roomSchema
        .count({})
        .then((roomCount) => {
          //return number of room as response of promise
          res(roomCount);
        })
        .catch((err) => {
          //return error if we catch it
          rej(err);
        })
    );
  }
}

module.exports = {
  Message,
  Room,
};
