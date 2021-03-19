import {deleteUser, updateUser} from './utils/userAccount';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import {redirect} from './utils/utils'

export default function Account() {
  const [cookie, , removeCookie] = useCookies(["user"]);

  let msg = 'Change your Password';

  if (!cookie.user) {
    redirect();
  } 

  function deleteAccount() {
    let del = window.confirm("Are you sure?");
    if (del) {
      deleteUser(cookie.user)
        .then(result => {
          if (result) {
            removeCookie('user', {
              path: '/',
              sameSite: 'strict'
            })
            redirect();
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
              <h1>Account</h1>
              <p className='text'>{msg}</p>
              <input type="email" defaultValue={cookie.user} id='email' disabled />
              <input type="password" placeholder="********" id='password'/>
              <p id="error-msg"></p>
              <div>
              <Button
              className='submit'
              variant="success"
              id='cancel'
              onClick={() => redirect()}>
                Cancel
              </Button>
              <Button
              className='submit'
              variant="danger"
              id='delete'
              onClick={() => deleteAccount()}>
                Delete
              </Button>
              <Button 
              className='submit'
              variant="primary"
              id='update'
              onClick={() => {
                updateUser(cookie.user);
              }}
              >
                Update
              </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}