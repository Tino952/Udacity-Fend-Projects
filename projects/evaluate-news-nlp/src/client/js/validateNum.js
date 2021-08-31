// sentence number validator

function validateNum(num) {

  // between 1 and 3 digits between 1 and 9

  let regex = /^[1-9]([0-9]{0,2})$/

  let testIt = regex.test(num);

  if (testIt === false) {

    return false;

  }

  return num

}

//////////////////////////////////////////////////////////////////////////

export {validateNum}
