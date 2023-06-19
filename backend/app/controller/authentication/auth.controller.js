var passport = require("passport");
const Joi = require("joi");

var User = require("./../../models/user/user.model");

//helper
const {
  errorMessageSeparator,
  duplicateValues,
} = require("./../../helper/errorMessage");

module.exports.register = async function (req, res) {
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
    return res
      .status(400)
      .send({ message: errorMessageSeparator(error.details) });
  }

  const user = new User(value.name, value.email, value.password);

  try {
    const response = await user.createNewUser();

    // Save token in a cookie with a name of "token"
    res.cookie("token", response.token, {
      //set age of cookie for one week (7 days)
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).send({
      ...response,
    });
  } catch (error) {
    //check error
    if (error.code === 11000) {
      //error is duplicated values => return items which is duplicated
      return res.status(400).send({ message: duplicateValues(error) });
    }

    console.log("error : ", error);

    return res.status(500).send({
      message: error || "error in create new user",
    });
  }
};

module.exports.login = function (req, res) {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required().min(6).max(10),
  });

  const { error, value } = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    //return sepreted error to user
    return res
      .status(400)
      .send({ message: errorMessageSeparator(error.details) });
  }

  //validate in passport js
  passport.authenticate("local", function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = User.generateJwt(user._id, user.email, user.name, user.role);

      // Save token in a cookie with a name of "token"
      res.cookie("token", token, {
        //set age of cookie for one week (7 days)
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(201);
      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token: token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.googleRegisteration = async function (req, res) {
  console.log("in google authentication");
  passport.authenticate("google", { scope: ["email", "profile"] });
};

module.exports.googleRegisterCallback = async function (req, res) {
  //register callback redirect
  console.log("in google callback");

  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  });
};

module.exports.googleRegisterSuccess = function (req, res) {
  console.log("in google register succesfuly");

  res.send({
    message: "google authentication successed",
  });
};

module.exports.googleRegisterFailure = async function (req, res) {
  console.log("in google register failed");

  res.send({
    message: "google authentication failed",
  });
};
