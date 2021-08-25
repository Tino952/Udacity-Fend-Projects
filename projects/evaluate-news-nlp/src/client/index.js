// To do : make tests in validators as well as in canvas.js

// importing styles

import ".//styles/styles.scss"

// importing canvas files

import ".//js/arrow.js"

// import validators - remember to prefix with "Client" when calling function

import {validateUrl} from ".//js/validators.js"
import {validateNum} from ".//js/validators.js"

// Make header highlight bar responsive to mouse events

let myHighlight = document.querySelector("#highlight");

myHighlight.addEventListener("mousemove", () => {

  // getting dimensions of highlight bar

  let rect = myHighlight.getBoundingClientRect();

  // removing animation class as this animation fixes the width of the highlight
  // bar, which doesn't allow me to change the width afterwards in js

  myHighlight.classList.remove("highlight-animation");

  let x = event.clientX;

  myHighlight.style.width = x - rect.left + "px";

})

// create keyup event on url input form

let myUrl = document.getElementById("url-input__form");

let resolveUrl = "https://en.wikipedia.org/wiki/Star_Trek";

myUrl.addEventListener("keyup", (event) => {

  if (event.keyCode === 13) {

    if (myUrl.value != "") {

      if (validateUrl(myUrl.value) != false) {

        resolveUrl = validateUrl(myUrl.value)

      }

    }

      document.querySelector(".url-input").classList.add("input__hide");

      document.querySelector(".sentence-input").classList.remove("input__hide");

    }

})

// create enter click event on sentence input form

let mySentences = document.querySelector(".sentence-input");

mySentences.addEventListener("keyup", (event) => {

  if (event.keyCode === 13) {

    let mySentencesInput = document.querySelector("#sentence-input__form")

    let myOutput;

    if (mySentencesInput.value != "") {

        let resolveNum = validateNum(mySentencesInput.value);

        if (resolveNum != false) {

          myOutput = resolveNum;

        }

    } else {

        myOutput = mySentencesInput.placeholder

    }

    console.log(resolveUrl);

    console.log(myOutput);

  }

})
