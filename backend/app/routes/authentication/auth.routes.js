var express = require("express");
var router = express.Router();
var jwt = require("express-jwt");

// var ctrlProfile = require("../controllers/profile");
var ctrlAuth = require("./../../controller/authentication/auth.controller");

// authentication => local
router.post("/signup", ctrlAuth.register);
router.post("/login", ctrlAuth.login);

// authentication => google
router.post("/google", ctrlAuth.googleRegisteration);
router.post("/google/callback", ctrlAuth.googleRegisterCallback);
router.post("/auth/google/success", ctrlAuth.googleRegisterSuccess);
router.post("/auth/google/failure", ctrlAuth.googleRegisterFailure);

module.exports = router;
