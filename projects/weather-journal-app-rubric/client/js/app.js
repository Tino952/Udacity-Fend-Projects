// Fulfilling rubric requirements

/////////////////////////////////////////////////////////////////////////////

// declaring global variable

/////////////////////////////////////////////////////////////////////////////

const apiKey = "313b04c8f9f854f041863f1759ceecbe";

/////////////////////////////////////////////////////////////////////////////

// HTTP methods

/////////////////////////////////////////////////////////////////////////////

// get request for getting weather data from api

async function getUrl (url = "") {

    const request = await fetch(url+apiKey)

    try {
        const newData = await request.json();
        return newData;
    } catch(err) {
        console.log("error", err);
    }
}

// get request for recieving data from server

async function getData (url = "") {

    const request = await fetch(url)

    try {
        const newData = await request.json();
        return newData;
    } catch(err) {
        console.log("error", err);
    }
}

// post request for sending user messages to server

async function postIt (url = "", data = {}) {
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

// recieving data in JSON format
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(err) {
  console.log("error", err)
}
}


/////////////////////////////////////////////////////////////////////////////

// async functions to execute http methods and update ui

/////////////////////////////////////////////////////////////////////////////

// selecting dom elements and adding click event listeners

// button to initialize the api fetch request after entering zip code

let zipInputGo = document.querySelector("#generate");

zipInputGo.addEventListener("click", ()=> {zipInit()})

// function to grab user feelings

function getMessage () {
  let message = document.querySelector("#feelings").value;
  return message;
}

// run get request to openweathermap api

async function inputInit() {
  const startUrl = "https://api.openweathermap.org/data/2.5/weather?zip="
  const endUrl = "&units=metric&appid="
  // zip code entered by user
  let zipInput = document.querySelector("#zip");
  let myZip = zipInput.value
  // create url and initiate get http request
  let myUrl = startUrl+myZip+endUrl
  const result = await getUrl(myUrl);
  return result;
}

// extract data from api

async function zipInit () {
  // running get request of openweathermap api
  const result = await inputInit();
  // storing data in an object and posting this object to server
  try {
    let tempMin = Math.round(result.main.temp_min);
    let tempMax = Math.round(result.main.temp_max);
    let unixTimeStamp = result.dt
    let comment = getMessage();
    let zipName = result.name
    let myData = {
      tempMin: tempMin,
      tempMax: tempMax,
      date: unixTimeStamp,
      comment: comment,
      city: zipName
    }
    postIt("/share", myData);
    // updating UI
    return updateUI();
  } catch(err) {
    console.log(err);
    return alert("please enter a valid zip code")
  }
  };

// updates the UI of entryHolder
async function updateUI () {

  // requesting data from server with get request
  myData = await getData("/all");
  let tempMin = myData.tempMin
  let tempMax = myData.tempMax
  let unix = myData.date
  let comment = myData.comment
  let city = myData.city

  // selecting relevant dom elements
  let myEntryHolder = document.querySelector("#entryHolder")
  let myDate = document.querySelector("#date");
  let myCity = document.querySelector("#title");
  let myTempMin = document.querySelector("#temp-min");
  let myTempMax = document.querySelector("#temp-max");
  let myContent = document.querySelector("#content")

  // make entryHolder appear
  myEntryHolder.style.display = "grid"

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var months= ['January','February','March','April','May','June','July','August','September','October','November','December'];
  // convert date to js format with milliseconds
  let date = new Date(unix * 1000);
  let weekday = days[date.getDay()];
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = 1900 + date.getYear();

  myDate.textContent = `${weekday}, ${month} ${day}, ${year}`;
  myTempMin.textContent = `Min: ${tempMin}°`;
  myTempMax.textContent = `Max: ${tempMax}°`;
  myCity.textContent = `Weather for ${city}`;
  myContent.textContent = `Your comment: ${comment}`
}
