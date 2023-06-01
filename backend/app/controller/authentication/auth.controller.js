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
    return res.status(400).send(errorMessageSeparator(error.details));
  }

  const user = new User(value.name, value.email, value.password);

  try {
    const response = await user.createNewUser();

    return res.status(201).send({
      ...response,
    });
  } catch (error) {
    //check error
    if (error.code === 11000) {
      return res.status(400).send(duplicateValues(error));
    }

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
    return res.status(400).send(errorMessageSeparator(error.details));
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
      token = User.generateJwt(user._id, user.email, user.name);
      res.status(200);
      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        token: token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.profileRead = function (req, res) {
  console.log("come here");

  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: private profile",
    });
  } else {
    User.findById(req.payload._id).exec(function (err, user) {
      res.status(200).json(user);
    });
  }
};
