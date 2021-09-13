// requiring dependencies

const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
// starting instance of express
const app = express();
// running files located in dist folder on npm run start script
app.use(express.static('dist'));

// calling middleware
const bodyParser = require("body-parser");
// app.use(bodyParser.json());
app.use(bodyParser.text())

// object with api keys

const myKeys = {
  "geonames": process.env.geonames,
  "weatherbit" : process.env.weatherbit,
  "pixabay" : process.env.pixabay
}

// post request to send api key to client

app.post("/apiKey", sendKey);

function sendKey (req, res) {
  try {
    let api = req.body;
    let key = JSON.stringify(myKeys[api]);
    res.send(key);
  } catch(error) {
      console.log(error)
  }
}

// exporting app for our server and test to access

module.exports = app
