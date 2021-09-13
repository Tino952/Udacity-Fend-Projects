function checkRemove () {
  let myDest = document.getElementById("city-input__sel").value;
  let myDate = document.getElementById("date-input__form").value;
  let myId = myDate+myDest;
  let myTripElem = document.getElementById(myId);
  // if element is in list of saved trips, then enable remove button
  let removeTrip = document.getElementById("remove-trip");
  let saveTrip = document.getElementById("save-trip");
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

function removeIt () {
  let myDest = document.getElementById("city-input__sel").value;
  let myDate = document.getElementById("date-input__form").value;
  localStorage.removeItem(myDest);
  let myId = myDate+myDest;
  let myTripElem = document.getElementById(myId);
  myTripElem.parentElement.removeChild(myTripElem);
  checkRemove()
}

export {checkRemove};
