// url validator

function validateUrl(url) {

  // string start with http:// or https://
  // string may not contain any space or quote characters
  // string must contain at least one character following the http://
  // string must contain at least one dot

  let regex = /^((http|https):\/\/([^ "]+)(.+))(\.+)/

  let testIt = regex.test(url);

  if (testIt === false) {

    return false;

  }

  return url

}

//////////////////////////////////////////////////////////////////////////

export {validateUrl}
