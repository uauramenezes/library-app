import axios from 'axios';
import errorMessage from './errorMessage';

async function updateAccount(email: string) {
  let password = (document.getElementById('password') as HTMLInputElement).value;

  let response = false;

  await axios.put('http://localhost:5555/auth/update', {
    email: email,
    password: password
  })
    .then((res) => {
      if (res.status === 200) {
        errorMessage('Password changed');
        response = true;
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

    return response;
}

async function deleteAccount(email:string) {
  let response = false;
  await axios.delete('http://localhost:5555/auth/delete', {
    data: {
      email: email
    }
  })
    .then((res) => {
      if (res.status === 200) {
        errorMessage('none');
        response = true;
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

    return response;
}

export {deleteAccount, updateAccount}
