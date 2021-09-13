// This function checks if the current entered destination and date have a
// corresponding entry in the saved trips list.
// If there is an entry for current destination and date, then activate the
// "remove-trip" button. Otherwise, deactivate it by adding the "prevent-click"
// class which removes any pointer events

function checkRemove () {
  let myDest = document.getElementById("city-input__sel").value;
  let myDate = document.getElementById("date-input__form").value;
  let myId = myDate+myDest;
  // checking whether this element exists in document. This id was created in
  // the function "StoreIt" in index.js
  let myTripElem = document.getElementById(myId);
  let removeTrip = document.getElementById("remove-trip");
  let saveTrip = document.getElementById("save-trip");
  // if element is in list of saved trips, then enable remove button. Disable
  // save trip button as this dest + date combination already exist
  if (myTripElem) {
    removeTrip.classList.remove("prevent-click");
    removeTrip.addEventListener("click", removeIt);
    saveTrip.classList.add("prevent-click");
  // otherwise, disable remove button, but enable save trip button
  } else {
    removeTrip.classList.add("prevent-click");
    removeTrip.removeEventListener("click", removeIt);
    saveTrip.classList.remove("prevent-click");
  }
}

// This function essentially removes the current dest + date selection from the
// saved trips list.
function removeIt () {
  let myDest = document.getElementById("city-input__sel").value;
  let myDate = document.getElementById("date-input__form").value;
  localStorage.removeItem(myDest);
  let myId = myDate+myDest;
  let myTripElem = document.getElementById(myId);
  myTripElem.parentElement.removeChild(myTripElem);
}

export {checkRemove};
