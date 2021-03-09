import validator from 'validator';
import errorMessage from './errorMessage'

function validateSignUp(email:string, password1:string, password2:string):boolean {
  let validUser = false;

  if (!validator.isEmail(email) || validator.isEmpty(email)) {
    errorMessage("invalid");
  } else if (password1 !== password2) {
    errorMessage("match");
  } else if (password1.length < 8 || password2.length < 8) {
    errorMessage("length");
  }  else {
    validUser = true;
    errorMessage("none");
  }

  return validUser;
}

export {validateSignUp};