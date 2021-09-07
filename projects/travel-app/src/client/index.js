// importing styles

import ".//styles/styles.scss"

// importing validator

import {validateDestination} from ".//js/validateDestination.js"

// import placeholder for page init

import {myObj} from ".//js/app.js"

// import functions to run HTTP requests

import {getGeonames, getWeatherbit, getPixabay} from ".//js/app.js"

// initialize page with data from placeholder object exported from app.js

(async () => {

  let initDate = myObj.date

  let initDest = myObj.dest

  document.getElementById("date-input__form").value = initDate;

  let myDestInp = document.getElementById("city-input__sel");

  myDestInp.value = initDest

  let myList = await getGeonames(initDest);

  myDestInp.setAttribute("lat", myList[0].lat);

  myDestInp.setAttribute("lng", myList[0].lng);

  // initialize event listener incase user wants to only change dates of init
  // destination and search

  let myInputButton = document.getElementById("input-go");

  myInputButton.addEventListener("click", go);

  go();

})()

// function to update datalist

function updateUiList (name, coordinates) {

  let myDestList = document.getElementById("city-input__list");

  let myListElem = document.createElement("a");

  myListElem.classList.add("city-input__list-elem")

  myListElem.textContent = name.toString();

  myListElem.addEventListener("click", (event=> {
    let myDestInp = document.getElementById("city-input__sel");
    myDestInp.value = myListElem.textContent
    // assign lat and long attributes of chosen list element to dest input
    myDestInp.setAttribute("lat", coordinates.lat);
    myDestInp.setAttribute("lng", coordinates.lng);
    // clear list of links
    myDestList.innerHTML = "";
    // add click event listener to "Go!" button when we make a selection
    let myInputButton = document.getElementById("input-go");
    myInputButton.classList.remove("prevent-go");
    myInputButton.addEventListener("click", go);
  }))

  myDestList.appendChild(myListElem);

}

// keyup event listener for destination input field

let myDestInput = document.getElementById("city-input__sel");

myDestInput.addEventListener("keyup", genList);

// function to run on user input and clicking on "go" button

async function genList (event) {

  // returns array of objects with placenames based on input destination

  let myList = await getGeonames(myDestInput.value);

  // clear previous items

  document.getElementById("city-input__list").innerHTML = ""

  // remove click event listener from "Go!" button while we are typing...
  let myInputButton = document.getElementById("input-go");
  myInputButton.removeEventListener("click", go);
  myInputButton.classList.add("prevent-go");

  if (myList !== undefined) {

    // working with a map makes it easy to avoid duplicate items

    const myMap = new Map();

    for (let elem of myList) {

      let myDestCoordinates = {};

      let myDestName = (elem.placeName + ", " + elem.adminName1 + ", " +
      elem.countryCode);

      console.log(elem);

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

function go (event) {

  let date = document.getElementById("date-input__form").value

  let myDestInp = document.getElementById("city-input__sel").value

  let name = myDestInp.split(",")[0].trim();

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

  let futureDate = new Date(date)

  let difference = Math.ceil((futureDate - todayDate) / (1000 * 60 * 60 * 24));

  myDays.innerHTML = `${dest} is ${difference} days away`;

  updateWeather(difference);

}

async function updateWeather (days) {

  let myWeather = document.getElementById("output__main__weather__entry");

  let lng = document.getElementById("city-input__sel").getAttribute("lng");

  let lat = document.getElementById("city-input__sel").getAttribute("lat");

  if (days < 16) {
    let myWeatherData = await getWeatherbit(lat, lng, days);
    myWeather.textContent = `Forecast weather for your departure date: ${myWeatherData.temp}° with ${myWeatherData.description.toLowerCase()}`;
  } else {
    myWeather.textContent = "";
  }

}

async function updatePhoto (name) {

  let myUrl = await getPixabay(name);

  document.getElementById("city-photo").style.backgroundImage=`url(${myUrl})`;

}
