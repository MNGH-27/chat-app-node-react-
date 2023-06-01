// const session = require("express-session");
// var path = require("path");

const express = require("express");

//REQIURE INSTALLED MIDDLE WARES
const cors = require("cors");
var logger = require("morgan");
var bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");

//creat app
const app = express();

//import custome data
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

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });
// error handlers

// [SH] Catch unauthorised errors
// app.use(function (err, req, res, next) {
//   if (err.name === "UnauthorizedError") {
//     res.status(401);
//     res.json({ message: err.name + ": " + err.message });
//   }
//   next();
// });

// development error handler
// will print stacktrace
// if (app.get("env") === "development") {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render("error", {
//       message: err.message,
//       error: err,
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render("error", {
//     message: err.message,
//     error: {},
//   });
// });

//ADD ROUTER =: API OF V1
app.use("/v1", api);

module.exports = app;
