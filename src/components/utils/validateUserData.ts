import axios from 'axios';
import validator from 'validator';
import errorMessage from './errorMessage';

async function validateUserData(email: string, password: string, action:string):Promise<boolean> {
  if (validator.isEmpty(email) || !validator.isEmail(email)) {
    return errorMessage("Invalid email format");
  } else if (password.length < 8) {
    return errorMessage("Password must contain at least 8 characters");
  } else {
    let result = await validateOnServer(email, password, action);
    if (result) {
      return true;
    } else {
      return false
    }
  }
}

async function validateOnServer(email:string, password:string, type:string):Promise<boolean> {
  let isAuth = false;
  await axios.post(`http://localhost:8080/auth/${type}`, {
    email: email,
    password: password,
  })
    .then((res) => {
      if (res.status === 200) {
        errorMessage('none');
        isAuth = true;
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

    return isAuth;
}

export default validateUserData;