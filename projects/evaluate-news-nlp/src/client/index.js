// importing styles

import ".//styles/styles.scss"

// importing canvas files

import ".//js_no_test/arrow.js"

// importing validators

import {validateUrl} from ".//js/validateUrl.js"
import {validateNum} from ".//js/validateNum.js"

// importing http functions

import {apiCall} from ".//js_no_test/meaningCloudApi.js"

//////////////////////////////////////////////////////////////////////////

// Make header highlight bar responsive to mouse events

// *****************************************************************************

// Global variables for this section:

// *****************************************************************************

let myHighlight = document.querySelector("#highlight");

// *****************************************************************************

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

// *****************************************************************************

// Global variables for this section:

// *****************************************************************************

let myUrl = document.getElementById("url-input__form");

// default url set in case user clicks enter without entering a url at all

let resolveUrl = "https://en.wikipedia.org/wiki/Star_Trek";

// *****************************************************************************

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

//////////////////////////////////////////////////////////////////////////

// create keyup event on sentence number input form
// this event will trigger the following:

// 1) api post to server with url and sentence number
// 2) server returns compiled url including api key
// 3) api get to meaningcloud using the compiled url
// 4) meaningcloud returns the summary data
// 5) typewriter function is executed to print the summary data in output box

// *****************************************************************************

// Global variables for this section:

// *****************************************************************************

let mySentences = document.querySelector(".sentence-input");

let text = ""

// *****************************************************************************

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

    document.querySelector(".sentence-input").classList.add("input__hide");

    // send inputs to server and recieve compiled url as a response

    let data = {

      "url" : resolveUrl,
      "num" : sentenceNum
    }

    // call data from meaningcloud using the compiled url

    let apiResponse = apiCall("/sendData", data).then(result => {

      text = result;

      typewriter();

    })

  }

})


//////////////////////////////////////////////////////////////////////////


// determines the number of lines to be added within the output box based on
// the height of the output container

function genLines () {

  // first, we calculate the number of lines needed using the raw height of
  // the output box and the line height

  let myOutputDimensions = document.getElementById("output__box").getBoundingClientRect();

  let paddingAndBorder = 3.2

  let myOutputHeight = myOutputDimensions.bottom - myOutputDimensions.top - paddingAndBorder;

  // in the future I could automatically extract lineHeight and default pixel size
  // from style sheets. Adding 1 to account for 1px border width

  let lineHeight = (1.5 * 16)

  let numberOfLines = Math.ceil(myOutputHeight / lineHeight) - 1

  // subtracting one more because we don't need a last line

  for (let i = 0; i < numberOfLines; i++) {

    // in this loop we continually add a new child span element to the last
    // child of myLine. In this way I am able to draw lines in the background
    // of the output box equal to the number of lines that fit into output box
    // this mechanism only adds new lines if new spans are appended as children
    // of previous span. This way, through absolute positioning based on previous
    // span, we are able to get evenly spaced lines.

    let myLine = document.querySelector(".output__box__line");

    let mySpan = document.createElement("SPAN");

    mySpan.classList.add("output__box__line");

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

//////////////////////////////////////////////////////////////////////////

// creating a function to redraw lines on resize of output box

// *****************************************************************************

// Global variables for this section:

// *****************************************************************************

let myOutput = document.getElementById("output__box")

// *****************************************************************************

new ResizeObserver(myOutputResize).observe(myOutput);

function myOutputResize () {

  while (myOutput.children.length > 1) {

    myOutput.removeChild(myOutput.lastElementChild)

    // clearing all myLine child elements from output box, only preserving
    // the output__box__text element with the text

  }

  genLines()

};

//////////////////////////////////////////////////////////////////////////

// function to type text into screen with slight delay between characters

// *****************************************************************************

// Global variables for this section:

// *****************************************************************************

let myText = document.querySelector("#output__box__text");

let speed = 30;

let i = 0;

// *****************************************************************************

function typewriter () {

  let length = text.length;

  if (i <= length) {

    myText.textContent = "";

    myText.textContent += text.substring(0, i);

    if (i !== length) {

      myText.textContent += "_"

    }

    i ++

    setTimeout(typewriter, speed)

  }

}
