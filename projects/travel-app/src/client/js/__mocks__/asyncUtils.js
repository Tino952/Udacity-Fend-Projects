//////////////////////////////////////////////////////////////////////////

// Mock functions for testing in jest

//////////////////////////////////////////////////////////////////////////

function getData (inp) {

  try {
    let mockData = Promise.resolve({
      postalCodes : ["a","b"]
    })
    return mockData
  } catch(error) {
      console.log(error)
  }
}

// function to retrieve api keys from server

function getKeys (inp1, inp2) {
  try {
    let mockKey = Promise.resolve("mockKey");
    return mockKey
  } catch(error) {
    console.log(error);
  }

}

export {getData, getKeys};
