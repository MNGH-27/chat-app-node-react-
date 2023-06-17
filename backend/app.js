const express = require("express");

//REQIURE INSTALLED MIDDLE WARES
const cors = require("cors");
var logger = require("morgan");
var bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");

//custom middleware
const authenticatedMiddleWare = require("./app/middleware/authentication.middleware");

//creat app
const app = express();
//import api
const api = require("./app/routes/api.routes");

//[SH] DEFINE MODAL IN APP.JS
require("./app/config/database");

// [SH] Bring in the Passport config after model is defined
require("./app/config/passport");

//middle wares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//CORS HADNLING
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//ADD ACCESS-CONTROL-CREDENTIAL
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//ADD ACCESS-CONTROL-ORIGIN => DOMAINS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

//custom middleware
app.use(authenticatedMiddleWare);

//ADD ROUTER =: API OF V1
app.use("/v1", api);

module.exports = app;
