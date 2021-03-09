import axios from 'axios'
import errorMessage from './errorMessage';

function createUser(email: string, password: string) {
  axios.post('http://localhost:8080/auth/signup', {
    email: email,
    password: password,
    }).then((res) => {
      if (res.status === 200) {
        setTimeout(() => {
            window.location.replace(process.env.PUBLIC_URL);
        }, 500);
    }
    }).catch(error => {
        let msg = (error.message as string).slice(-3);

        if (msg === '403') {
          errorMessage('used')
        } else {
          errorMessage('server')
        }

        console.log(error);
    });
}

export default createUser;