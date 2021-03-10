import Button from 'react-bootstrap/Button';
import validateUserData from './utils/validateUserData';
import { useCookies } from 'react-cookie';
import redirect from './utils/redirect';

export default function SignUp() {
    const [cookie, setCookie] = useCookies(["user"]);

    if (cookie.user === 'admin') {
        redirect();
    }
    
    async function authenticate() {
        let userEmail = document.getElementById('register-email') as HTMLInputElement;
        let password = document.getElementById('password') as HTMLInputElement;

        let result = await validateUserData(userEmail.value, password.value, 'sign-up')
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
                            <h1>Register</h1>
                            <p className='text'> Please enter an email and password!</p>
                            <input type="email" className='register' placeholder="Email" id='register-email' required />
                            <input type="password" className='register' placeholder="Password" id='password' required />
                            <p id="error-msg"></p>
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