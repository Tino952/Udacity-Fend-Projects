// what does path.resolve do?
// do I need path?

// requiring dependencies

const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const express = require('express');
// starting instance of express
const app = express();
app.use(express.static('dist'));

// requiring restful functions
const meaningCloud = require('./meaning_cloud_api.js')

// calling middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// checking if a port is available in the environment variable

const port = process.env.PORT || 8080;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`App listening on port ${port}!`)
})

// let abs = __dirname.slice(0,__dirname.search("src"));

// receiving user input

app.post('/sendData', function (req, res) {
    const data = req.body;
    console.log(data);
    let myResponse =  "Data recieved by server";
    res.send(JSON.stringify(myResponse));
})
