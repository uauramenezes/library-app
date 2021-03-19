import axios from 'axios';
import validator from 'validator';
import {showMessage} from './utils';

function validateUserData(email:string, password:string):boolean {
  if (validator.isEmpty(email) || !validator.isEmail(email)) {
    return showMessage("Invalid email format");
  } else if (password.length < 8) {
    return showMessage("Password must contain at least 8 characters");
  } else {
    return true
  }
}

function createAccount(action:string, email:string, password: string):Promise<boolean> {
  // https://library-app-auth-api.herokuapp.com/
  return axios.post(`http://localhost:5555/${action}`, {
    email: email,
    password: password
  })
    .then((res) => {
      if (res.status === 200) {
        return showMessage('none');
      } else if (res.status === 403 || res.status === 404) {
        return showMessage(res.data.error);
      } else {
        return showMessage('OOPS! An error occurred!');
      }
    })
    .catch(error => {
      console.log(error);
      return showMessage('OOPS! An error occurred!');
    });
}

function updateAccount(email: string) {
  let password = (document.getElementById('password') as HTMLInputElement).value;

  // https://library-app-auth-api.herokuapp.com/auth/update
  return axios.put('http://localhost:5555/auth/update', {
    email: email,
    password: password
  })
    .then((res) => {
      if (res.status === 200) {
        return showMessage('none');
      } else if (res.status === 403 || res.status === 404) {
        return showMessage(res.data.error);
      } else {
        return showMessage('OOPS! An error occurred!');
      }
    })
    .catch(error => {
      console.log(error);
      return showMessage('OOPS! An error occurred!');
    });
}

function deleteAccount(action:string, email:string) {
  // https://library-app-auth-api.herokuapp.com/
  return axios.delete(`http://localhost:5555/${action}`, {
    data: {
      email: email
    }
  })
  .then((res) => {
    if (res.status === 200) {
      return showMessage('none');
    } else if (res.status === 403 || res.status === 404) {
      return showMessage(res.data.error);
    } else {
      return showMessage('OOPS! An error occurred!');
    }
  })
  .catch(error => {
    console.log(error);
    return showMessage('OOPS! An error occurred!');
  });
}

export {createAccount, deleteAccount, updateAccount, validateUserData};