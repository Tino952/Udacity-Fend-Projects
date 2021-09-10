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

  export {getData, getKeys};
