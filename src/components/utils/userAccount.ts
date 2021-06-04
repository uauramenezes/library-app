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

function postRequest(action:string, email:string, password: string):Promise<boolean> {
  return axios.post(`https://uaura-library-api.herokuapp.com/${action}`, {
    email: email,
    password: password
  })
    .then(() => {
      return showMessage('none');
    })
    .catch(error => {
      if (error.response.status === 500) {
        console.log(error)
        return showMessage('OOPS! An error occurred!');
      } else {
        return showMessage(error.response.data.error)
      }
    });
}

function updateAccount(email: string) {
  let password = (document.getElementById('password') as HTMLInputElement).value;

  return axios.put(`https://uaura-library-api.herokuapp.com/auth/update`, {
    email: email,
    password: password
  })
    .then((res) => {
      if (res.status === 200) {
        return showMessage('Password changed');
      }
    })
    .catch(error => {
      if (error.response.status === 500) {
        console.log(error)
        return showMessage('OOPS! An error occurred!');
      } else {
        return showMessage(error.response.data.error)
      }
    });
}

function deleteAccount(action:string, email:string) {
  return axios.delete(`https://uaura-library-api.herokuapp.com/${action}`, {
    data: {
      email: email
    }
  })
  .then((res) => {
    if (res.status === 200) {
      return showMessage('none');
    } 
  })
  .catch(error => {
    if (error.response.status === 500) {
      console.log(error)
      return showMessage('OOPS! An error occurred!');
    } else {
      return showMessage(error.response.data.error)
    }
  });
}

export {postRequest, deleteAccount, updateAccount, validateUserData};