const Joi = require("joi");

//helper
const { errorMessageSeparator } = require("./../../helper/errorMessage");
const User = require("../../models/user/user.model");

function GetUser(req, res) {
  //here we get data from token in cookie
  res.status(200).send({
    ...req.user,
  });
}

async function GetUserByName(req, res) {
  const userSchema = Joi.object({
    name: Joi.string().required(),
  });

  const { error, value } = userSchema.validate(req.query, {
    abortEarly: false,
  });

  if (error) {
    //return sepreted error to user
    return res
      .status(400)
      .send({ message: errorMessageSeparator(error.details) });
  }

  //check if requested user be equal to current user
  if (req.user.name === value.name) {
    res.status(401).send({
      message: "you can't message to your self",
    });
  }

  try {
    const findedUser = await User.GetSingleUserByName(value.name, {
      password: 0,
      role: 0,
      hash: 0,
      salt: 0,
      createdAt: 0,
      __v: 0,
    });

    //check if have user and role of user
    if (findedUser === null || findedUser.role === "admin") {
      res.status(400).send({
        message: "there is no any user with this username",
      });
    } else {
      //send user
      res.send({
        id: findedUser._id,
        name: findedUser.name,
        email: findedUser.email,
      });
    }
  } catch (error) {
    console.log("error in GetUserByName => ", error);
    return res.status(500).send({
      message: error || "error in create new user",
    });
  }
}

module.exports = {
  GetUser,
  GetUserByName,
};
