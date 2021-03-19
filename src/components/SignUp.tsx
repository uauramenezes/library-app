import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import {redirect} from './utils/utils';

import {validateUserData, createAccount} from './utils/userAccount';
//import {createBookList} from './utils/bookList';

export default function SignUp() {
  const [cookie, setCookie] = useCookies(["user"]);

  if (cookie.user) {
    redirect();
  }
  
  function authenticate() {
    let email = (document.getElementById('email') as HTMLInputElement).value;
    let password = (document.getElementById('password') as HTMLInputElement).value;
    
    if (validateUserData(email, password)) {
      createAccount('auth/sign-up', email, password)
        .then(result => {
          if (result) {
            createAccount('library/create', email, password)
              .then(res => {
                if (res) {
                  setCookie('user', email, {
                    path: '/',
                    sameSite: 'strict'
                  });
                  redirect();
                }
              })
          }
        })
    } 
  }

  return(
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <form className="box">
              <h1>Register</h1>
              <p className='text'> Please enter an email and password!</p>
              <input type="email" placeholder="Email" id='email' required />
              <input type="password" placeholder="Password" id='password' required />
              <p id="msg"></p>
              <Button className='submit' variant="outline-info" onClick={
                () => {
                  authenticate();
                }
              }>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}