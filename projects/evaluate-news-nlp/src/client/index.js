// importing styles

import ".//styles/styles.scss"

// importing canvas files

import ".//js/arrow.js"

// importing validators

import {validateUrl} from ".//js/validators.js"
import {validateNum} from ".//js/validators.js"

// importing http functions

import {apiCall} from ".//js/meaning_cloud_api.js"

//////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////

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

    // send inputs to server and recieve compiled url as a response

    let data = {

      "url" : resolveUrl,
      "num" : sentenceNum
    }

    // call data from meaningcloud using the compiled url

    let apiResponse = apiCall("/sendData", data).then(result => {
      console.log(result);
    })

  }

})


//////////////////////////////////////////////////////////////////////////


// creating functionality to print text character by character in output box

let sampleText = "Star Trek is an American science fiction entertainment franchise based on the television series created by Gene Roddenberry. The first television series, simply called Star Trek and now referred to as The Original Series, debuted in 1966 and aired for three seasons on the television network NBC.";

let textLength = sampleText.length;

let speed = 10;

let i = 0;

let myText = document.querySelector("#output__box__text");

// determines the number of lines to be added within the output box based on
// the height of the output container

function genLines () {

  // first, we calculate the number of lines needed using the raw height of
  // the output box and the line height

  let myOutputDimensions = document.getElementById("output__box").getBoundingClientRect();

  let paddingAndBorder = 3.2

  let myOutputHeight = myOutputDimensions.bottom - myOutputDimensions.top - paddingAndBorder;

  // in the future I could automatically extract lineHeight and default pixel size
  // from style sheets

  let lineHeight = 1.5 * 16

  let numberOfLines = Math.ceil(myOutputHeight / lineHeight) - 1 - 1

  // subtracting one because we already have first line in "output__box__line__1"
  // subtracting one more because we don't need a last line

  for (let i = 0; i < numberOfLines; i++) {

    // in this loop we continually add a new child span element to the last
    // child of myLine. In this way I am able to draw lines in the background
    // of the output box equal to the number of lines needed, which is calculated
    // above

    let myLine = document.querySelector(".output__box__line__2");

    let mySpan = document.createElement("SPAN");

    mySpan.classList.add("output__box__line__2");

    if (myLine == undefined) {

      // creating first line

      document.getElementById("output__box").appendChild(mySpan);

      continue

    }

    // iterate to the last child element of the tree

    while (myLine.children.length > 0) {

      myLine = myLine.lastElementChild;

    }

    myLine.appendChild(mySpan)

  }

}

genLines();

window.addEventListener("resize", ()=> {

  let myOutput = document.getElementById("output__box")

  while (myOutput.children.length > 1) {

    myOutput.removeChild(myOutput.lastElementChild)

    // clearing all myLine child elements from output box, only preserving
    // the output__box__line__1 element and its child node

  }

  genLines()

});

// function to type text into screen with slight delay between characters

function typewriter () {

  if (i <= textLength) {

    myText.textContent = "";

    myText.textContent += sampleText.substring(0, i);

    if (i !== textLength) {

      myText.textContent += "_"

    }

    i ++

    setTimeout(typewriter, speed)

  }

}

typewriter();
