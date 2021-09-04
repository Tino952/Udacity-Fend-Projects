const myObj = {

  dest: "Paris, FR",
  date: ""

};
// make date value and min equal today's date, set max to one year from today

(function () {

  let date = new Date();

  let day = date.getDate();

  let month = date.getMonth() + 1;

  let initMonth = date.getMonth() + 2;

  let year = date.getFullYear();

  if (month < 10) month = "0" + month;

  if (initMonth < 10) initMonth = "0" + initMonth;

  if (day < 10) day = "0" + day;

  let today = year + "-" + month + "-" + day;

  let nextYear = year + 1 + "-" + month + "-" + day;

  // setting one month in future as the init date

  let initDate = year + "-" + initMonth + "-" + day;

  // setting date input field min and max values

  document.getElementById("date-input__form").min = today;

  document.getElementById("date-input__form").max = nextYear;

  // setting placeholder date property equal to initDate

  myObj.date = initDate;

})();

export {myObj};

//////////////////////////////////////////////////////////////////////////

// setting up asynchronous js

//////////////////////////////////////////////////////////////////////////

// function to retrieve api keys from server

async function getKeys (url = "", data = "") {
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
  },
  body: data,
  });

  try {
    const data = await response.json();
    return data;
  } catch(err) {
  console.log(err)
  }
  }


// compiling user input and executing geonames api call

async function asyncStack (inp) {
  let urlStart = "http://api.geonames.org/postalCodeSearchJSON?";
  let destArr = inp.split(",")
  let placename = destArr[0].trim();
  let country = "";
  if (destArr[1]) {
    country = destArr[1].trim()
  }
  if (destArr[2]) {
    placename = destArr[0].trim() + "," + destArr[1].trim();
    country = destArr[2].trim();
  }
  let apiKey = await getKeys("/apiKey", "geonames");
  let compiledUrl = `${urlStart}placename=${placename}&country=${country}&maxRows=10&username=${apiKey}`
  let myData = await geonamesCall(compiledUrl)
  console.log(myData);
}

export {asyncStack};


async function geonamesCall (url = "") {

    const request = await fetch(url)

    try {
        const newData = await request.json();
        return newData;
    } catch(error) {
        console.log(error)
    }
}
