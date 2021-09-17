// As per rubric requirements

projectData = {};

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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// Setting default page

app.use(express.static("client"));

// Initializing Server

app.listen(port, () => console.log(`running on localhost ${port}`));

// HTTP post request

app.post("/share", logData);

function logData (req, res) {
  const data = req.body;
  projectData.city = data.city;
  projectData.date = data.date;
  projectData.tempMin = data.tempMin;
  projectData.tempMax = data.tempMax;
  projectData.comment = data.comment;
  let myResponse =  "Data recieved by server";
  res.send(JSON.stringify(myResponse));
}

// HTTP get request

app.get("/all", sendIt);

function sendIt(req, res) {
  console.log(projectData);
  res.send(JSON.stringify(projectData));
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
