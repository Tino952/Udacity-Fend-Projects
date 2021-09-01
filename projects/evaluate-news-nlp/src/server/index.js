// what does path.resolve do?
// do I need path?

// requiring dependencies

const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const express = require('express');
// starting instance of express
const app = express();
// running files located in dist folder on npm run start script
app.use(express.static('dist'));

// calling middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// checking if a port is available in the environment variable

const port = process.env.PORT || 8081;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`App listening on port ${port}!`)
})

// let abs = __dirname.slice(0,__dirname.search("src"));

// receiving user input and sending the compiled url back to enable fetch
// request

app.post('/sendData', function (req, res) {
  try {
    const userData = req.body;
    let finalUrl = compileUrl(userData.url, userData.num);
    res.send(JSON.stringify(finalUrl));
  } catch(error) {
      console.log(error)
  }
})

function compileUrl (url, num) {
  let urlStart = "http://api.meaningcloud.com/summarization-1.0?";
  let apiKey = process.env.API_KEY;
  let myUrl = url;
  let myNum = num;
  let compiledUrl = `${urlStart}key=${apiKey}&url=${url}&sentences=${num}`;
  return compiledUrl;
}
