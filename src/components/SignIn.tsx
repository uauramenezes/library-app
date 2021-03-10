import Button from 'react-bootstrap/Button';
import validateUserData from './utils/validateUserData';

export default function SignIn() {
    function authenticate() {
        let userEmail = document.getElementById('login-email') as HTMLInputElement;
        let password = document.getElementById('password') as HTMLInputElement;

        validateUserData(userEmail.value, password.value, 'sign-in');
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
