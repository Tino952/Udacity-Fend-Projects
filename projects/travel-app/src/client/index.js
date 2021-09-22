// importing styles

import ".//styles/styles.scss";

// import placeholder for page init

import { myObj } from ".//js/utils.js";

// import functions to run HTTP requests

import { getGeonames, getWeatherbit, getPixabay } from ".//js/app.js";

// importing event listener to fulfill rubric instructions

import { myEventListener } from ".//js/eventListener.js";

// importing checkRemove, a function for which we also run a test in jest

import { checkRemove } from ".//js/checkRemove.js";

// initialize page with data from placeholder object exported from app.js

(async () => {
  let initDate = myObj.date;

  let initDest = myObj.dest;

  let myDate = document.getElementById("date-input__form");

  myDate.value = initDate;

  myDate.addEventListener("change", checkRemove);

  let myDestInp = document.getElementById("city-input__sel");

  myDestInp.value = initDest;

  let myList = await getGeonames(initDest);

  myDestInp.setAttribute("lat", myList[0].lat);

  myDestInp.setAttribute("lng", myList[0].lng);

  // initialize buttons incase user wants to only change dates of init
  // destination and search

  let myInputButton = document.getElementById("input-go");

  myInputButton.addEventListener("click", go);

  let saveTrip = document.getElementById("save-trip");

  saveTrip.addEventListener("click", storeIt);

  // do not allow user to remove a trip without saving one first

  checkRemove();

  go();
})();

// function to update datalist

function updateUiList(name, coordinates) {
  let myDestList = document.getElementById("city-input__list");

  let myListElem = document.createElement("a");

  myListElem.classList.add("city-input__list-elem");

  myListElem.textContent = name.toString();

  myListElem.addEventListener("click", (event) => {
    let myDestInp = document.getElementById("city-input__sel");
    myDestInp.value = myListElem.textContent;
    // assign lat and long attributes of chosen list element to dest input
    myDestInp.setAttribute("lat", coordinates.lat);
    myDestInp.setAttribute("lng", coordinates.lng);
    // clear list of links
    myDestList.innerHTML = "";
    // add click event listener to our buttons when we make a selection
    let myInputButton = document.getElementById("input-go");
    myInputButton.addEventListener("click", go);
    myInputButton.classList.remove("prevent-click");
    let saveTrip = document.getElementById("save-trip");
    saveTrip.addEventListener("click", storeIt);
    saveTrip.classList.remove("prevent-click");
  });

  myDestList.appendChild(myListElem);
}

// keyup event listener for destination input field

let myDestInput = document.getElementById("city-input__sel");

myDestInput.addEventListener("keyup", genList);

// function to run on user input and clicking on "go" button

async function genList() {
  // returns array of objects with placenames based on input destination

  let myList = await getGeonames(myDestInput.value);

  // clear previous items

  document.getElementById("city-input__list").innerHTML = "";

  // remove click event listener from button while we are typing...
  let myInputButton = document.getElementById("input-go");
  myInputButton.removeEventListener("click", go);
  myInputButton.classList.add("prevent-click");
  let saveTrip = document.getElementById("save-trip");
  saveTrip.removeEventListener("click", storeIt);
  saveTrip.classList.add("prevent-click");

  checkRemove();

  if (myList !== undefined) {
    // working with a map makes it easy to avoid duplicate items

    const myMap = new Map();

    for (let elem of myList) {
      let myDestCoordinates = {};

      let myDestName =
        elem.placeName + ", " + elem.adminName1 + ", " + elem.countryCode;

      let myDestNameNoDigits = myDestName.replace(/[0-9]/g, "");

      myDestCoordinates.lat = elem.lat;

      myDestCoordinates.lng = elem.lng;

      if (myMap.has(myDestNameNoDigits)) {
        continue;
      } else {
        myMap.set(myDestNameNoDigits, myDestCoordinates);
      }
    }

    for (let [key, value] of myMap) {
      updateUiList(key, value);
    }
  }
}

function go() {
  let date = document.getElementById("date-input__form").value;

  let myDestInp = document.getElementById("city-input__sel").value;

  let name = myDestInp.split(",")[0].trim();

  checkRemove();

  updateUi(name, date);

  updatePhoto(name);
}

function updateUi(dest, date) {
  let myOutputHead = document.getElementById("output__main__head__content");

  let dateArray = date.split("-");

  let myCompiledDate = dateArray.reduceRight((curr, next) => curr + "/" + next);

  myOutputHead.innerHTML = `My Trip to ${dest}<br>Departing ${myCompiledDate}`;

  let myDays = document.getElementById("output__main__days");

  let todayDate = new Date();

  let futureDate = new Date(date);

  let difference = Math.ceil((futureDate - todayDate) / (1000 * 60 * 60 * 24));

  myDays.innerHTML = `${dest} is ${difference} days away`;

  updateWeather(difference);
}

async function updateWeather(days) {
  let myWeather = document.getElementById("output__main__weather__entry");

  let lng = document.getElementById("city-input__sel").getAttribute("lng");

  let lat = document.getElementById("city-input__sel").getAttribute("lat");

  if (days < 16) {
    let myWeatherData = await getWeatherbit(lat, lng, days);
    myWeather.textContent = `Forecast weather for your departure date: ${
      myWeatherData.temp
    }° with ${myWeatherData.description.toLowerCase()}`;
  } else {
    myWeather.textContent = "";
  }
}

async function updatePhoto(name) {
  let myUrl = await getPixabay(name);

  document.getElementById("city-photo").style.backgroundImage = `url(${myUrl})`;
}

function storeIt() {
  let myDate = document.getElementById("date-input__form").value;
  let myDest = document.getElementById("city-input__sel").value;
  createTrip(myDest, myDate);
  let uniqueId = createUniqueId(myDest, myDate);
  // setting unique local storage key based on dest and date for case that user
  // saves multiple dates for the same destination
  localStorage.setItem(uniqueId, myDate);
  checkRemove();
}

function createUniqueId(destination, date) {
  return destination + "!" + date;
}

export { createUniqueId };

function createTrip(destination, date) {
  let myTrips = document.getElementById("saved-trips");
  let myTripElem = document.createElement("li");
  let uniqueId = createUniqueId(destination, date);
  myTripElem.setAttribute("id", uniqueId);
  myTripElem.classList.add("plane");
  let myTripLink = document.createElement("a");
  myTripLink.classList.add("trip-element__link");
  let myDestSimple = destination.split(",")[0].trim();
  let dateArray = date.split("-");
  let myCompiledDate = dateArray.reduceRight((curr, next) => curr + "/" + next);
  myTripLink.textContent = myDestSimple + ", " + myCompiledDate;
  myTripElem.appendChild(myTripLink);
  myTrips.appendChild(myTripElem);
  myTripLink.addEventListener("click", () => {
    retrieveTrip(uniqueId);
  });
}

function retrieveTrip(key) {
  let dest = key.split("!")[0].trim();
  let date = localStorage.getItem(key);
  document.getElementById("date-input__form").value = date;
  document.getElementById("city-input__sel").value = dest;
  go();
}

// generating list based on local storage
function genTripList() {
  for (let key in localStorage) {
    let destination = key.split("!")[0].trim();
    let date = localStorage[key];
    if (typeof date == "string") {
      createTrip(destination, date);
    }
  }
}

genTripList();
clearList();

function clearList() {
  let clearTripsButton = document.getElementById("clear-trips");
  clearTripsButton.addEventListener("click", () => {
    localStorage.clear();
    let myTrips = document.getElementById("saved-trips");
    while (myTrips.firstChild) {
      myTrips.removeChild(myTrips.firstChild);
    }
    checkRemove();
  });
}
