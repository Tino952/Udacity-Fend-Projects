// running asynchronous code

import {getData, getKeys} from ".//asyncUtils.js"

// compiling user input and executing geonames api call

async function getGeonames (inp) {
  try {
    let urlStart = "http://api.geonames.org/postalCodeSearchJSON?";
    let placename = inp.replace(/[,]/g, '');
    let apiKey = await getKeys("/apiKey", "geonames");
    let compiledUrl = `${urlStart}placename=${placename}&maxRows=10&username=${apiKey}`
    let myData = await getData(compiledUrl)
    let myDataArr = myData.postalCodes
    return myDataArr;
  } catch(err) {
    console.log(err)
  }
}

// compiling url based on lat and lon of selected input destination and/
// retrieving weather data from weatherbit api

async function getWeatherbit (lat, lng, days) {
  let urlStart = "https://api.weatherbit.io/v2.0/forecast/daily?"
  let apiKey = await getKeys("/apiKey", "weatherbit");
  let compiledUrl = `${urlStart}lat=${lat}&lon=${lng}&key=${apiKey}`
  let myData = await getData(compiledUrl)
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
  let myUrl = "";
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
