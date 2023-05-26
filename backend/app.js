const express = require("express");

const cors = require("cors");

const app = express();

//import route
const api = require("./app/routes/api.routes");

//middle wares
app.use(
  cors({
    origin: ["http://localhost:3000/"],
  })
);

//custome middle wares

//route
app.use("/v1", api);

module.exports = app;
