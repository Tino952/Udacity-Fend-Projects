const myObj = {

  dest: "Berlin, Berlin, DE",
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

// Plain vanilla get url function to communicate with apis

async function getData (url = "") {

    const request = await fetch(url)

    try {
        const newData = await request.json();
        return newData;
    } catch(error) {
        console.log(error)
    }
}

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

async function getGeonames (inp) {
  let urlStart = "http://api.geonames.org/postalCodeSearchJSON?";
  let placename = inp.replace(/[,]/g, '');
  let apiKey = await getKeys("/apiKey", "geonames");
  let compiledUrl = `${urlStart}placename=${placename}&maxRows=10&username=${apiKey}`
  console.log(compiledUrl);
  let myData = await getData(compiledUrl)
  console.log(myData);
  let myDataArr = myData.postalCodes
  return myDataArr;
}

// compiling url based on lat and lon of selected input destination and/
// retrieving weather data from weatherbit api

async function getWeatherbit (lat, lng, days) {
  let urlStart = "https://api.weatherbit.io/v2.0/forecast/daily?"
  let apiKey = await getKeys("/apiKey", "weatherbit");
  let compiledUrl = `${urlStart}lat=${lat}&lon=${lng}&key=${apiKey}`
  console.log(compiledUrl);
  let myData = await getData(compiledUrl)
  console.log(myData);
  let myWeather = {}
  myWeather.temp = myData.data[days].temp;
  myWeather.description = String(myData.data[days].weather.description);
  return myWeather;
}

// compiling url based on simple name of destination and retrieving
// one of 10 randomly selected corresponding stock photos from pixabay api

async function getPixabay (dest) {
  let urlStart = "https://pixabay.com/api/?"
  let apiKey = await getKeys("/apiKey", "pixabay");
  let compiledUrl = `${urlStart}key=${apiKey}&q=${dest}&image_type=photo&per_page=10`
  let defaultUrl = "https://pixabay.com/api/?key=23272715-5e0b198733e5e936a24b025e5&q=city&image_type=photo&per_page=10"
  let myData = await getData(compiledUrl)
  let myDataLength = myData.hits.length
  let randPhoto = Math.floor(Math.random()*myDataLength);
  let myUrl = ""
  if (myData.hits.length > 0) {
    myUrl = myData.hits[randPhoto].webformatURL;
  } else {
    // if the city destination returns no photos, then
    // return one of first 10 photos from pixabay search of "city"
    randPhoto = Math.floor(Math.random()*10);
    myUrl = getData(defaultUrl).then((result) => result.hits[randPhoto].webformatURL)
}
  return myUrl;
}

export {getGeonames, getWeatherbit, getPixabay};
