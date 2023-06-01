require("dotenv").config();

const http = require("http");

//import app(express()) from  app.js
const app = require("./app");

const PORT = process.env.PORT || 5000;

//create server on app
const server = http.createServer(app);

//function of starting backend project
async function startServer() {
  server.listen(PORT, () => {
    console.log("server is run on PORT", PORT);
  });
}

//start server  . . .
startServer();

// . . . . .
