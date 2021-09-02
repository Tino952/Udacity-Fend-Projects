// importing styles

import ".//styles/styles.scss"

// importing validator

import {validateDestination} from ".//js/validateDestination.js"

// getting destination and date inputs from user

let myInputButton = document.getElementById("input-go");

myInputButton.addEventListener("click", (event) => {

    event.preventDefault();

    let myDestination = document.getElementById("city-input__form");

    let myDestinationValue = myDestination.placeholder;

    if (myDestination.value != "") {

      if (validateDestination(myDestination.value) != false) {

        myDestinationValue = validateDestination(myDestination.value)

      } else {

        alert("please enter a valid destination");

        return

      }

      console.log(myDestinationValue);

  }

})
