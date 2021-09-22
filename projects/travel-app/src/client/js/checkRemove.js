import { createUniqueId } from "../index";

function checkRemove() {
  let myDest = document.getElementById("city-input__sel").value;
  let myDate = document.getElementById("date-input__form").value;
  let uniqueId = createUniqueId(myDest, myDate);
  let myTripElem = document.getElementById(uniqueId);
  // if element is in list of saved trips, then enable remove button
  let removeTrip = document.getElementById("remove-trip");
  let saveTrip = document.getElementById("save-trip");
  let clearTrips = document.getElementById("clear-trips");
  if (saveTrip.hasChildNodes) {
    clearTrips.classList.remove("prevent-click");
  } else {
    clearTrips.classList.add("prevent-click");
  }
  if (myTripElem) {
    removeTrip.classList.remove("prevent-click");
    removeTrip.addEventListener("click", removeIt);
    saveTrip.classList.add("prevent-click");
  } else {
    removeTrip.classList.add("prevent-click");
    removeTrip.removeEventListener("click", removeIt);
    saveTrip.classList.remove("prevent-click");
  }
}

function removeIt() {
  let myDest = document.getElementById("city-input__sel").value;
  let myDate = document.getElementById("date-input__form").value;
  let uniqueId = createUniqueId(myDest, myDate);
  localStorage.removeItem(uniqueId);
  let myTripElem = document.getElementById(uniqueId);
  myTripElem.parentElement.removeChild(myTripElem);
  checkRemove();
}

export { checkRemove };
