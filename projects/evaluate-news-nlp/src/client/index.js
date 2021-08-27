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

      } else {

        alert("please enter a valid url");

        return

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

    let sentenceNum;

    if (mySentencesInput.value != "") {

        let resolveNum = validateNum(mySentencesInput.value);

        if (resolveNum != false) {

          sentenceNum = resolveNum;

        } else {

          alert("please enter a valid number");

          return

        }

    } else {

        sentenceNum = mySentencesInput.placeholder

    }

    // send inputs to server and recieving response

    let data = {

      "url" : resolveUrl,
      "num" : sentenceNum
    }

    console.log(data);

    postIt("/sendData", data)

  }

})

// post request for sending user input to server

async function postIt (url = "", data = {}) {
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(err) {
  console.log("error", err)
}
}
