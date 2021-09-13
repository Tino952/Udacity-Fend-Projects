// importing styles

import ".//styles/styles.scss"

// import placeholder for page init

import {myObj} from ".//js/utils.js"

// import functions to run HTTP requests

import {getGeonames, getWeatherbit, getPixabay} from ".//js/app.js"

// import event listener to fulfill rubric instructions

import {myEventListener} from ".//js/eventListener.js"

// import checkRemove, a function for which we also run a test in jest

import {checkRemove} from ".//js/checkRemove.js"

// initialize page with data from placeholder object exported from utils.js

(async () => {

  let initDate = myObj.date

  let initDest = myObj.dest

  let myDate = document.getElementById("date-input__form");

  myDate.value = initDate;

  // event listener in case user changes date, which would activate the removal
  // of the "delete trip" functionality by adding the class "prevent-click"
  // see more details in checkRemove.js file.

  myDate.addEventListener("change", checkRemove);

  let myDestInp = document.getElementById("city-input__sel");

  myDestInp.value = initDest

  // getting data for the placeholder object from utils.js

  let myList = await getGeonames(initDest);

  myDestInp.setAttribute("lat", myList[0].lat);

  myDestInp.setAttribute("lng", myList[0].lng);

  // initialize "go" and "save trip" buttons

  let myInputButton = document.getElementById("input-go");

  myInputButton.addEventListener("click", go);

  let saveTrip = document.getElementById("save-trip");

  saveTrip.addEventListener("click", storeIt);

  // do not allow user to remove a trip without saving one first

  checkRemove();

  go();

})()

// Function to take the chosen destination from the dropdown search results
// list and plugging the chosen destination and coordinates into the input field.
// This is achieved by creating a link element for each item and appending
// this to the ul element "city-input__list".
// The coordinates parameter passed into the function is an object

function updateUiList (name, coordinates) {

  let myDestList = document.getElementById("city-input__list");

  let myListElem = document.createElement("a");

  myListElem.classList.add("city-input__list-elem")

  myListElem.textContent = name.toString();

  // adding event listener to transfer the information from the selected
  // option from dropdown to the input destination and date fields

  myListElem.addEventListener("click", (event=> {
    let myDestInp = document.getElementById("city-input__sel");
    myDestInp.value = myListElem.textContent
    // assign lat and long attributes of chosen list element to dest input
    myDestInp.setAttribute("lat", coordinates.lat);
    myDestInp.setAttribute("lng", coordinates.lng);
    // clear list of links
    myDestList.innerHTML = "";
    // add click event listener to our buttons when we make a selection
    // allowing the user to press the "go" button in order to see photo and
    // weather for travel destination and to be able to save that trip
    let myInputButton = document.getElementById("input-go");
    myInputButton.addEventListener("click", go);
    // remove "prevent-click" class from input button if it was assigned
    myInputButton.classList.remove("prevent-click");
    let saveTrip = document.getElementById("save-trip");
    saveTrip.addEventListener("click", storeIt);
    // remove "prevent-click" class from save trip button if it was assigned
    saveTrip.classList.remove("prevent-click");
  }))

  myDestList.appendChild(myListElem);

}

// keyup event listener for destination input field

let myDestInput = document.getElementById("city-input__sel");

myDestInput.addEventListener("keyup", genList);

// function to update drop down list of returned destinations from geonames API
// this function takes the destination name and coordinates of each returned
// item from user input of chosen destination.

async function genList () {

  // returns array of objects with placenames based on input destination

  let myList = await getGeonames(myDestInput.value);

  // clear previous items

  document.getElementById("city-input__list").innerHTML = ""

  // remove click event listeners from input and save trip buttons while the
  // user is typing...
  let myInputButton = document.getElementById("input-go");
  myInputButton.removeEventListener("click", go);
  myInputButton.classList.add("prevent-click");
  let saveTrip = document.getElementById("save-trip");
  saveTrip.removeEventListener("click", storeIt);
  saveTrip.classList.add("prevent-click");

  // check if remove trip button should be activated
  checkRemove();

  // if the user input generated search results, then extract exact destination
  // name and coordinates and save to map data structure.
  // Working with a map makes it easy to avoid duplicate items

  if (myList !== undefined) {

    const myMap = new Map();

    for (let elem of myList) {

      let myDestCoordinates = {};

      let myDestName = (elem.placeName + ", " + elem.adminName1 + ", " +
      elem.countryCode);

      // removing any numbers from destination list e.g. "Paris 01", "Paris 02",
      // "Paris 03", all becoming just "Paris".

      let myDestNameNoDigits = myDestName.replace(/[0-9]/g, "");

      myDestCoordinates.lat = elem.lat;

      myDestCoordinates.lng = elem.lng;

      if (myMap.has(myDestNameNoDigits)) {
        continue
      } else {
        myMap.set(myDestNameNoDigits, myDestCoordinates);
      }
      }

      for (let [key, value] of myMap) {
        updateUiList(key, value);
      }
  }
}

// this function essentially updates the user interface i.e. adds the photo and
// updates the output text based on the chosen destination

function go () {

  let date = document.getElementById("date-input__form").value

  let myDestInp = document.getElementById("city-input__sel").value

  let name = myDestInp.split(",")[0].trim();

  checkRemove();

  updateUi(name, date);

  updatePhoto(name);

}

// Function to update the output text based on chosen date and destination

function updateUi(dest, date) {

  let myOutputHead = document.getElementById("output__main__head__content");

  let dateArray = date.split("-");

  // date from input date element comes in format YYYY-MM-DD
  // I wanted to change this to DD/MM/YYYY using the array, reduceRight method

  let myCompiledDate = dateArray.reduceRight((curr, next) => curr + "/" + next);

  myOutputHead.innerHTML = `My Trip to ${dest}<br>Departing ${myCompiledDate}`;

  let myDays = document.getElementById("output__main__days");

  let todayDate = new Date();

  let futureDate = new Date(date)

  // calculating how many days until travel date

  let difference = Math.ceil((futureDate - todayDate) / (1000 * 60 * 60 * 24));

  myDays.innerHTML = `${dest} is ${difference} days away`;

  updateWeather(difference);

}

// checking the weather forecast for chosen destination and date

async function updateWeather (days) {

  let myWeather = document.getElementById("output__main__weather__entry");

  let lng = document.getElementById("city-input__sel").getAttribute("lng");

  let lat = document.getElementById("city-input__sel").getAttribute("lat");

  // as Weatherbit API only provides weather forecasts for 16 days in the future
  // we only trigger API call if days < 16.

  if (days < 16) {
    let myWeatherData = await getWeatherbit(lat, lng, days);
    myWeather.textContent = `Forecast weather for your departure date: ${myWeatherData.temp}° with ${myWeatherData.description.toLowerCase()}`;
  } else {
    myWeather.textContent = "";
  }

}

// Function to update photo with randomly selected top 10 search results for that
// destination from Pixabay API

async function updatePhoto (name) {

  let myUrl = await getPixabay(name);

  document.getElementById("city-photo").style.backgroundImage=`url(${myUrl})`;

}

// This function stores a chosen trip to the local browser storage

function storeIt () {
  let myDate = document.getElementById("date-input__form").value
  let myDest = document.getElementById("city-input__sel").value;
  let myTrips = document.getElementById("saved-trips");
  // creating a list element for chosen trip, using a custom bullet point
  let myTripElem = document.createElement("li");
  // setting the id of that element to dest + date in order to search for this
  // id whenever we are checking whether the remove button should be active i.e.
  // if that element's ID exists in the document.
  myTripElem.setAttribute("id", myDate+myDest);
  myTripElem.classList.add("plane");
  let myTripLink = document.createElement("a");
  myTripLink.classList.add("trip-element__link");
  // myDestSimple holds just the name of the destination for our UI
  let myDestSimple = myDest.split(",")[0].trim()
  let dateArray = myDate.split("-");
  let myCompiledDate = dateArray.reduceRight((curr, next) => curr + "/" + next);
  myTripLink.textContent = myDestSimple + ", " + myCompiledDate;
  myTripElem.appendChild(myTripLink);
  myTrips.appendChild(myTripElem);
  // setting unique local storage key based on dest and date for case that user
  // saves multiple dates for the same destination
  let localStorageKey = myDest + ":" + myDate
  localStorage.setItem(localStorageKey, myDate);
  // adding a click event listener to load a trip when the user clicks on the
  // link of a saved trip
  myTripLink.addEventListener("click", ()=>{retrieveTrip(localStorageKey)});
  // checking whether the remove button should be active
  checkRemove();
}

// Note that event listener callbacks only work with input passed to them if they
// are wrapped in a function.

// why is this?

// This function plugs the information from the saved trip into the destination
// and date input forms and runs the "go" function to udpate the UI.
function retrieveTrip (key) {
  let dest = key.split(":")[0].trim()
  let date = localStorage.getItem(key);
  document.getElementById("date-input__form").value = date
  document.getElementById("city-input__sel").value = dest
  go();
}
