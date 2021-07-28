// introduction:
// If I understood the project rubric correctly then the idea is to fetch weather
// data from the api and post it to the server, then retrieve this data including
// a user-logged message from the server and update the UI with it. In my code,
// I simply used the fetch request from the openweathermap api to update the UI
// directly on the client side, without storing the weather data on the server.
// The user input is however stored on the server, although I retrieve the content
// of the user input from the server in the same post request that I send it, and
// not with a get request. To fulfill the rubric requirments however I have
// created a "dummy" get request on server and client-side which returns an
// array holding the user comments

/////////////////////////////////////////////////////////////////////////////

// declaring global variable

/////////////////////////////////////////////////////////////////////////////

const apiKey = "313b04c8f9f854f041863f1759ceecbe";

/////////////////////////////////////////////////////////////////////////////

// HTTP methods

/////////////////////////////////////////////////////////////////////////////

// get request for getting weather data from api

const getIt = async (url = "") => {

    const request = await fetch(url)

    try {
        const newData = await request.json();
        return newData;
    } catch(error) {
        console.log(error)
    }
}

// post request for sending user messages to server
// as I am just sending strings back to the server, I set header accordingly

async function postIt (url = "", data = "") {
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
  },
  body: data,
});

// recieving data in JSON format
  try {
    const newData = await response.json();
    return newData;
  } catch(err) {
  console.log(err)
  // two error messages because same post request used in two functions
  if (url == "/retrieve") {
    alert("please enter a valid message id")
  } else if (url == "/share") {
    alert("please enter a valud input message")
  }}
}

/////////////////////////////////////////////////////////////////////////////

// funcionality to send user message to server

/////////////////////////////////////////////////////////////////////////////

// selecting button to activate sending message to server

let shareGo = document.querySelector("#share-go");

// function to grab user unput - message (in second bubble in html)

function userShare () {
  let shareContent = document.querySelector("#share-content").value;
  return shareContent;
}

// click event listener to send user message to server, and return an alert
// with the corresponding message id to the browser

shareGo.addEventListener("click", async ()=> {
  let input = userShare();
  let output = await postIt("/share", input)
  return alert(`Success: your message with index ${output} was logged to the server`)
})

/////////////////////////////////////////////////////////////////////////////

// funcionality to retrieve message from server

/////////////////////////////////////////////////////////////////////////////

// selecting button to activate retrieving message from server

let messageGo = document.querySelector("#message-go");

// function to grab user unput - message id (in third bubble in html)

function getMessageId () {
  let messageId = document.querySelector("#message-id").value;
  return messageId;
}

// click event listener to retrieve a message from the server using a
// user-entered message id

messageGo.addEventListener("click", async()=> {
  let i = getMessageId();
  let messageContent = document.querySelector("#message-content");
  let response = await postIt("/retrieve", i)
  messageContent.textContent = response;
})

/////////////////////////////////////////////////////////////////////////////

// declaring additional global variables to be used in the api fetch request and
// the update of ui. Most global variables are buttons with attached event listeners

/////////////////////////////////////////////////////////////////////////////

// selecting dom elements and adding click event listeners

// button to initialize the api fetch request after entering city

let cityInputGo = document.querySelector("#generate");

cityInputGo.addEventListener("click", ()=> {cityInit()})

// user selects a city from cityOutput

let cityYes = document.querySelector("#city-yes");

cityYes.addEventListener("click", ()=> {callYes()});

// user rejects a city in cityOutput

let cityNo = document.querySelector("#city-no")

cityNo.addEventListener("click", ()=> {callNo()});

// container to appear if api returns multiple cities from user input

let cityContainer = document.querySelector(".city-checker-container");

/////////////////////////////////////////////////////////////////////////////

// async functions to handle get fetch api from openweathermap and update ui

/////////////////////////////////////////////////////////////////////////////

// initializing variables to be used in loop to zero

let cityIndex = 0

let chosenCityIndex = 0

// grab entered city in first bubble (named "pop" in html) container, and
// run get request to openweathermap api

async function inputInit() {
  const startUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
  const endUrl = "&limit=5&appid="
  // city name entered by user
  let cityInput = document.querySelector("#city-input");
  let myCity = cityInput.value
  // create url and initiate get http request
  let myUrl = startUrl+myCity+endUrl+apiKey
  const result = await getIt(myUrl);
  return result;
}

// function to update a div with one of the possible city names returned by get request
// this is only used when user-entered city returns multiple hits, and we iterate
// through these hits until user accepts one

function outputFunction (output) {
  // div to iterate through the different city names returned by api fetch
  let cityOutput = document.querySelector("#city-output");
  // assign div content to output, which is one city from the returned array
  cityOutput.textContent = output;
  cityIndex ++;
}

// process the data returned from get request. This could be just one city,
// or multiple cities. If multiple cities returned, then prompt user to select
// one --> see callNo and callYes functions below

async function cityInit () {
  const result = await inputInit();
  try {
    if (result.length > 1) {
      // make container visible in window
      cityContainer.style.display = "block";
      let firstResult = result[0];
      // some cities, such as in the US, include a state property e.g. London, KY, US
      if (firstResult.state !== undefined) {
        let output = `${firstResult.name}, ${firstResult.state}, ${firstResult.country}`
        return outputFunction(output);
      } else {
        let output = `${firstResult.name}, ${firstResult.country}`
        return outputFunction(output);
        }
      } else if (result.length == 0) {
        // error, input not recognized
        alert("please enter a valid city, e.g. \"London\", or \"London, GB\"")
      } else {
        // if only one city returned by get request
        let chosenCityIndex = 0;
        return returnedCity(result,chosenCityIndex);
      }
  } catch(err) {
    console.log(err.message)
  }
  };

// only relevant for when get request returned multiple cities.
// user rejects one of the city suggestions by clicking on the "cityNo" button

async function callNo() {
  const result = await inputInit();

  async function callIt () {
    // cityIndex is one after running cityInit above
    let nextResult = result[cityIndex];
    if (nextResult.state !== undefined) {
      let output = `${nextResult.name}, ${nextResult.state}, ${nextResult.country}`
      return outputFunction(output);
    } else {
      let output = `${nextResult.name}, ${nextResult.country}`
      return outputFunction(output);
    }
  }
  // if we have successfully iterated through all returned cities in array.
  // in this case, we start from the first city. This is an infinite loop.
  async function finale () {
    cityIndex = 0;
    return callIt();
  }

  if (cityIndex == result.length) {
    return finale();
  } else {
    return callIt()
  }
}

// only relevant for when get request returned multiple cities.
// function to be called when user accepts a city suggestion
// activated by the cityYes button

async function callYes() {
  const result = await inputInit();
  chosenCityIndex = cityIndex-1;
  // reset cityIndex
  cityIndex = 0;
  // hide the cityContainer if city is chosen
  cityContainer.style.display = "none"
  return returnedCity(result,chosenCityIndex);
}

// this function essentially updates our UI with the weather data for the
// chosen city

function returnedCity(result,chosenCityIndex) {
  // function to get geographic coordinates from chosen city, obtain weather
  // data for three days and run updateUI, which updates each div
  // "main-container__content__day"
  async function convert (myCity) {
    let lat = myCity.lat;
    let lon = myCity.lon;
    // generate the weather data using geographic coordinates
    const myData = await city2Geo(lat,lon);
    // looping through daily data from day 0 to day 2, therefore returning data
    // for three days
    for (let i = 0; i < 3; i ++) {
      let unix = myData.daily[i].dt
      let min = Math.round(myData.daily[i].temp.min)
      let max = Math.round(myData.daily[i].temp.max)
      // running dataConvert to get readable data for ui from our returned api
      // object. E.g. date returned by api is a unix timestamp
      updateUI(unix, min, max, i);
    }
    return
  }
  // select relevant dom elements to be updated
  let mainContainer = document.querySelector("#main-container")
  let mainContainerTitle = document.querySelector("#main-container__title")

  // make main weather container appear in window
  mainContainer.style.display = "grid"
  // select chosen city from results array from get request
  let myCity = result[chosenCityIndex];
  if (myCity.state !== undefined) {
    let city = `Weather for ${myCity.name}, ${myCity.state}, ${myCity.country}`;
    // update UI with city name
    mainContainerTitle.textContent = city
    return convert(myCity);
  } else {
    let city = `Weather for ${myCity.name}, ${myCity.country}`;
    // update UI with city name
    mainContainerTitle.textContent = city
    return convert(myCity);
  }
}

// generates weather data using geographic coordinates
async function city2Geo (lat, lon) {
  const geoUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current, minutely,hourly,alerts&units=metric&appid=${apiKey}`
  const result = await getIt(geoUrl);
  return result;
}

// updates the UI of content for each of the 3 days in our main weather container
function updateUI (unix, min, max, i) {

  // selecting relevant dom elements
  let day1Title = document.querySelector("#day1-title")
  let day1Min = document.querySelector("#day1-min")
  let day1Max = document.querySelector("#day1-max")

  let day2Title = document.querySelector("#day2-title")
  let day2Min = document.querySelector("#day2-min")
  let day2Max = document.querySelector("#day2-max")

  let day3Title = document.querySelector("#day3-title")
  let day3Min = document.querySelector("#day3-min")
  let day3Max = document.querySelector("#day3-max")

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months= ['January','February','March','April','May','June','July','August','September','October','November','December'];
  // convert date to js format with milliseconds
  let date = new Date(unix * 1000);
  let weekday = days[date.getDay()];
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = 1900 + date.getYear();
  // eval used to stringify an object. This helps to iterate over each dom element
  // selected above
  eval(`day${i+1}Title`).textContent = `${weekday}, ${month} ${day}, ${year}`
  eval(`day${i+1}Min`).textContent = `Min: ${min}°`
  eval(`day${i+1}Max`).textContent = `Max: ${max}°`
}
