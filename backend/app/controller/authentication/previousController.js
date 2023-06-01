//import modules
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const errorMessageSeparator = require("./../../helper/errorMessage");

//user models
const User = require("./../../models/user/user.model");

async function Login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user)
      res.send({
        message: "no user exists",
      });
    else {
      req.logIn((user, err) => {
        if (err) throw err;
        res.send({
          message: "Successfully authenticate",
        });
        console.log(req.user);
      });
    }
  })(req, res, next);
}

async function Signup(req, res) {
  console.log("come to signup ");

  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(10),
  });

  const { error, value } = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    //return sepreted error to user
    return res.status(400).send(errorMessageSeparator(error.details));
  }

  const { name, password, email } = value;

  const hashedPassword = await bcrypt.hash(password, 10);

  //add data to user class in constructor
  const newUser = new User(name, email, hashedPassword, "salt");

  try {
    //request for save new user
    const response = await newUser.createNewUser();

    // generate a JWT for the new user
    // const token = jwt.sign({ sub: newUser.id }, "mysecret");
    // passport.authenticate("jwt");
    return res.status(201).json({ ...response });
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).send({
      message: "there is error in producing data",
    });
  }
}

module.exports = {
  Login,
  Signup,
};
