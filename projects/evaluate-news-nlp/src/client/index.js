// importing styles

import ".//styles/styles.scss"

// importing canvas files

import ".//js/arrow.js"

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
