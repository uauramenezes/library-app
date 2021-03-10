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
        let userEmail = document.getElementById('login-email') as HTMLInputElement;
        let password = document.getElementById('password') as HTMLInputElement;

        let result = await validateUserData(userEmail.value, password.value, 'sign-in');
        if (result) {
            setCookie('user', 'userEmail.value', {
                path: '/',
                sameSite: 'strict',
                maxAge: 3600
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
                            <input type="email" className='login' placeholder="Username" id='login-email' />
                            <input type="password" className='login' placeholder="Password" id='password' />
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
