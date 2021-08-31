// post request for sending user input to server

async function apiCall (url = "", data = {}) {
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

  try {
    // receiving the compiled url including the api key from the server
    const newData = await response.json();
    // get request to api using compiled URL
    let apiData = await getData(newData);
    // extracting summary data fro object
    let apiSummary = apiData.summary;
    return apiSummary;
  } catch(err) {
  console.log("error", err)
}
}

// plain vanilla http fetch request from meaningcloud api
async function getData (url = "") {

    const request = await fetch(url)

    try {
        const newData = await request.json();
        return newData;
    } catch(error) {
        console.log(error)
    }
}


export { apiCall }
