import Button from 'react-bootstrap/Button';
import validateUserData from './utils/validateUserData';
import { useCookies } from 'react-cookie';
import redirect from './utils/redirect';

export default function SignIn() {
    const [cookie, setCookie] = useCookies(["user"]);

    if (cookie.user) {
        redirect();
    }

    async function authenticate() {
        let email = (document.getElementById('email') as HTMLInputElement).value;

        let result = await validateUserData(email, 'sign-in');
        if (result) {
            setCookie('user', email, {
                path: '/',
                sameSite: 'strict'
            });
            redirect();
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <form className="box">
                            <h1>Login</h1>
                            <p className='text'> Please enter your email and password!</p>
                            <input type="email" placeholder="Email" id='email' />
                            <input type="password" placeholder="Password" id='password' />
                            <p id="error-msg"></p>
                            <Button className='submit' variant="outline-info" onClick={() => {
                                authenticate();
                            }}>Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
