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
        let email = (document.getElementById('email') as HTMLInputElement).value;

        let result = await validateUserData(email, 'sign-up')
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
                            <h1>Register</h1>
                            <p className='text'> Please enter an email and password!</p>
                            <input type="email" placeholder="Email" id='email' required />
                            <input type="password" placeholder="Password" id='password' required />
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