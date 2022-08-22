const { readdirSync } = require('fs')
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const { getRouteName } = require('./utils/utils');
const app = express();
dotenv.config();


const configConstants = {};
configConstants.port = process.env.PORT || 3001;
configConstants.localhost = `http://localhost:${configConstants.port}`;

// middleware
app.use(express.json({ limit: "100mb" }));
app.use(cors());

 
// routes
readdirSync("./routes").map(r => app.use(`/api/v1/${getRouteName(r)}`, require('./routes/'+r)));

app.get('/', function(req, res) {
  res.status(200).json({'message': `api is running on ${configConstants.localhost}`})
});


// server object
const server = {};

server.connect = async function() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully");
  } catch (error) {
    console.log("database connection failed!");
  }
}


server.init = function() {
  app.listen(configConstants.port, function() {
    console.log(`server listening ${configConstants.localhost}`);
  });
}


server.connect();
server.init();


