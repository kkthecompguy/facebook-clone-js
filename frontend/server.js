const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const configConstants = {};
configConstants.port = process.env.PORT || 3000;
configConstants.localhost = `http://localhost:${configConstants.port}`;

// set static folder
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

// server object
const server = {};

server.init = function () {
  app.listen(configConstants.port, function () {
    console.log(`server listening ${configConstants.localhost}`);
  });
};

server.init();
