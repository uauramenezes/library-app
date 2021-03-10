import axios from 'axios';
import redirect from './redirect';
import validator from 'validator';
import errorMessage from './errorMessage';

function validateUserData(email: string, password: string, type: string) {
  if (validator.isEmpty(email) || !validator.isEmail(email)) {
    errorMessage("Invalid email format");
  } else if (password.length < 8) {
    errorMessage("Password must contain at least 8 characters");
  } else {
    validateOnServer(email, password, type);
  }
}

function validateOnServer(email:string, password:string, type:string) {
  axios.post(`http://localhost:8080/auth/${type}`, {
    email: email,
    password: password,
  })
    .then((res) => {
      if (res.status === 200) {
        errorMessage('none');
        redirect();
      }
    })
    .catch(error => {
      let status = (error.message as string).slice(-3);

      if (status === '403' || status === '404') {
        let errorMsg = error.response.data.error;
        errorMessage(errorMsg);
      } else {
        errorMessage('OOPS! An error occurred!');
        console.log(error);
      }
    });
}

export default validateUserData;