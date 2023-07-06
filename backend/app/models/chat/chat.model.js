const { messageSchema, roomSchema, fileSchema } = require("./chat.schema");

class Message {
  constructor(recieverId, senderId, id, createAt, text, contentType, roomId) {
    this.recieverId = recieverId;
    this.senderId = senderId;
    this.id = id;
    this.createAt = createAt;
    this.text = text;
    this.contentType = contentType;
    this.roomId = roomId;
  }

  async createNewMessage(
    roomId,
    senderId,
    receiverId,
    createAt,
    text,
    contentType
  ) {
    return await new Promise((res, rej) => {
      messageSchema
        .create({
          roomId,
          senderId,
          receiverId,
          createAt,
          text,
          contentType,
        })
        .then((response) => {
          //return result as response
          res({
            id: response._id,
            senderId: response.senderId,
            receiverId: response.receiverId,
            createAt: response.createAt,
            text: response.text,
          });
        })
        .catch((err) => {
          //catch error if there would be error

          console.log("error  : ", err);

          rej(err);
        });
    });
  }

  async getAllMessagesOfRoom(roomId) {
    return await new Promise((res, rej) => {
      messageSchema
        .find({ roomId })
        .sort({})
        .then((response) => {
          res(response);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async getMessageOfRoomCount(roomId) {
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

class Room {
  constructor(recieverId, senderId, id, createAt) {
    this.recieverId = recieverId;
    this.senderId = senderId;
    this.id = id;
    this.createAt = createAt;
  }

  async checkRoomExist(senderId, receiverId) {
    console.log("senderId :", senderId);
    console.log("receiverId :", receiverId);

    return await new Promise((res, rej) => {
      roomSchema
        .findOne({
          $or: [
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        })
        .then((response) => {
          if (response === null) {
            res(response);
          } else {
            res({
              id: response._id,
              senderId: response.senderId,
              receiverId: response.receiverId,
              createAt: response.createAt,
            });
          }
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async createNewRoom(senderId, receiverId, createAt) {
    return await new Promise((res, rej) => {
      roomSchema
        .create({
          senderId: senderId,
          receiverId,
          createAt,
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
}

module.exports = {
  Message,
  Room,
};
