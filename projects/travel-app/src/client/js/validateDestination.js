// destination validator

function validateDestination(dest) {

  // dest may only contain letters
  // letters may be non-ASCII
  // dest may be hyphenated
  // dest must be at least one letter long

  let regex = /^[\p{L}-]+$/u

  let testIt = regex.test(dest);

  if (testIt === false) {

    return false;

  }

  return dest

}

//////////////////////////////////////////////////////////////////////////

export {validateDestination}
