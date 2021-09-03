// destination validator

function validateDestination(dest) {

  // dest may only contain letters
  // letters may be non-ASCII
  // may contain comma, period, or whitespace characters
  // dest must be at least one letter long

  let regex = /^[\p{L}\u002c\u002e\u0020]+$/u

  let testIt = regex.test(dest);

  if (testIt === false) {

    return false;

  }

  return dest

}

//////////////////////////////////////////////////////////////////////////

export {validateDestination}
