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
app.use(bodyParser.json());
app.use(bodyParser.text())

// checking if a port is available in the environment variable

const port = process.env.PORT || 8081;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`App listening on port ${port}!`)
})

// object with api keys

const myKeys = {
  "geonames": process.env.geonames_key
}

console.log(myKeys);

// post request to send api key to client

app.post("/apiKey", sendKey);

function sendKey (req, res) {
  try {
    let api = req.body;
    console.log(api);
    let key = JSON.stringify(myKeys.geonames);
    res.send(key);
  } catch(error) {
      console.log(error)
  }
}
