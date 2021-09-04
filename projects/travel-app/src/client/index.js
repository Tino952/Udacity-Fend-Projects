// importing styles

import ".//styles/styles.scss"

// importing validator

import {validateDestination} from ".//js/validateDestination.js"

// import placeholder for page init

import {myObj} from ".//js/app.js"

// import functions to run HTTP requests

import {asyncStack} from ".//js/app.js"

// initialize page

(() => {

  let initDate = myObj.date

  let initDest = myObj.dest

  document.getElementById("date-input__form").value = initDate;

  document.getElementById("city-input__form").value = initDest;

  submit();

})()

// getting destination and date inputs from user

let myInputButton = document.getElementById("input-go");

myInputButton.addEventListener("click", (event) => {

    submit();

})

// function to run on user input and clicking on "go" button

function submit () {

  let myDateValue = document.getElementById("date-input__form").value;

  let myDestination = document.getElementById("city-input__form");

  let myDestinationValue = myDestination.placeholder;

  if (myDestination.value != "") {

    if (validateDestination(myDestination.value) != false) {

      myDestinationValue = validateDestination(myDestination.value)

    } else {

      alert("please enter a valid destination");

      return

    }

  }

  updateUi(myDestinationValue, myDateValue);

  asyncStack(myDestinationValue);

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

  updateWeather()

}

function updateWeather () {

  let myWeather = document.getElementById("output__main__weather__entry");

  myWeather.textContent = "High - 46"

}
