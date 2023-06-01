var express = require("express");
var router = express.Router();
var jwt = require("express-jwt");

var auth = jwt.expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// var ctrlProfile = require("../controllers/profile");
var ctrlAuth = require("./../../controller/authentication/auth.controller");

// profile
router.get("/profile", auth, ctrlAuth.profileRead);

// authentication
router.post("/signup", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

module.exports = router;
