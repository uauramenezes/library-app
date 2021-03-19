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

function createUser(action:string, email:string, password: string):Promise<boolean> {
  return axios.post(`https://library-app-auth-api.herokuapp.com/${action}`, {
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

function updateUser(email: string) {
  let password = (document.getElementById('password') as HTMLInputElement).value;

  return axios.put('https://library-app-auth-api.herokuapp.com/update', {
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

function deleteUser(email:string) {
  return axios.delete('https://library-app-auth-api.herokuapp.com/delete', {
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

export {createUser, deleteUser, updateUser, validateUserData};