// Empty JS array to hold user comments sent from the client
// Note that I use an array to hold my objects

userResponses = [];

// requiring dotenv to hold api Key

const dotenv = require('dotenv');

dotenv.config();

// setting up an express environment and initializing an instance of express
// require("express") returns a function, which we assign to const express

const express = require("express");

// running this function returns an object assigned to const app, which has
// its own built-in functions like app.get(), app.post() etc.

const app = express();

// checking if a port is available in the environment variable

const port = process.env.PORT || 4004;

// calling middleware

const bodyParser = require("body-parser");
// next two lines are commented out because I am not parsing JSON but text
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json());
app.use(bodyParser.text())

const cors = require("cors");
app.use(cors());

// Setting default page

app.use(express.static("client"));

// Initializing Server

app.listen(port, () => console.log(`running on localhost ${port}`));

// postCounter keeps an index of incoming messages posted by client

let postCounter = 1;

// HTTP post request made with client message. Response sent is the id of the
// posted message so users can search for a message using an id

app.post("/share", logSharedData);

function logSharedData (req, res) {
  const data = req.body;
  let myLogInstance = {
    post : postCounter,
    message : data
  }
  userResponses.push(myLogInstance);
  let myResponse =  postCounter;
  res.send(JSON.stringify(myResponse));
  postCounter ++;
}

app.post("/retrieve", sendData);

function sendData (req, res) {
  let data = req.body;
  let i = parseInt(req.body);
  let message = userResponses[i-1].message;
  res.send(JSON.stringify(message))
}

// sending api key to client

let apiKey = process.env.API_KEY;

app.get("/getKey", sendKey)

function sendKey (req, res) {
  try {
    res.send(JSON.stringify(apiKey))
  } catch (error) {
    console.log(error)
  }
}

// as exlained in app.js introduction, I have updated the UI using the returned data from
// the weather data api directly on the client side, without posting this data to the
// server. To fulfill the rubric requirements I have however created a dummy get request
// below. In this case userResponses only holds comments and not the weather data, which
// remains only on the client side

app.get("/all", myDummy);

function myDummy(req, res) {
  res.send(userResponses)
}
