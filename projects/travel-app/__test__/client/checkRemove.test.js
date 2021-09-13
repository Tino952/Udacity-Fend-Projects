import {checkRemove} from "../../src/client/js/checkRemove.js"

describe("Testing the \"remove trip\" button", () => {

    test("If the a given trip exists under \"My Saved Trips\", \
    then the \"remove trip\" button should be enabled", () => {

    // initialiizing DOM content
    // currently the "prevent-click" class is added to button element

    document.body.innerHTML =
      '<input name="destination" id="city-input__sel">' +
      '<input type="date" name="enter date here" id="date-input__form" value="" min="" max="">' +
      '<button type="button" class="prevent-click" id="remove-trip">Remove Trip</button>' +
      '<button type="button" class="" id="save-trip">Save Trip</button>' +
      '<ul id="saved-trips"></ul>';

    // set value of destination and date

    let myDate = document.getElementById("date-input__form");
    let myDest = document.getElementById("city-input__sel");

    myDest.value = "Berlin, Berlin, DE";
    myDate.value = "2021-10-01";

    // running a piece of code from storeIt function which creates a list element
    // for a saved trip and adds this to ul "saved-trips"

    let myTrips = document.getElementById("saved-trips");
    let myTripElem = document.createElement("li");
    myTripElem.setAttribute("id", myDate.value + myDest.value);
    myTrips.appendChild(myTripElem);

    let init = ""

    // check that remove-trip button is enabled

    if (document.querySelector(".prevent-click")) {init = true};

    checkRemove();

      // we should have removed the "prevent-click" class from the "remove trip"
      // button after running the checkRemove function, as the searched destination
      // and date have been stored under saved trips, and can now be removed

      expect(init).toEqual(true);

      expect(document.getElementById("remove-trip").classList.contains("prevent-click")).toEqual(false);

})});
