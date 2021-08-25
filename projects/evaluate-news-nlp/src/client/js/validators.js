// url validator

function validateUrl(url) {

  // string start with http:// or https://
  // string may not contain any space or quote characters
  // string must contain at least one character following the http://
  // string must contain at least one dot

  let regex = /^((http|https):\/\/([^ "]+)(.+))(\.+)/

  let testIt = regex.test(url);

  if (testIt === false) {

    alert("please enter a valid url");

    return false;

  }

  return url

}

// sentence number validator

function validateNum(num) {

  // between 1 and 3 digits between 1 and 9

  let regex = /^[1-9]([0-9]{0,2})$/

  let testIt = regex.test(num);

  if (testIt === false) {

    alert("please enter a valid number");

    return false;

  }

  return num

}


export {validateUrl}

export {validateNum}
