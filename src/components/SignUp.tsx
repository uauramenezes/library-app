import Button from 'react-bootstrap/Button';
import createUser from './utils/createUser';
import {validateSignUp} from './utils/validateUserData';

export default function SignUp() {

    function authenticate() {
        let userEmail = document.getElementById('register-email') as HTMLInputElement;
        let password1 = document.getElementById('password1') as HTMLInputElement;
        let password2 = document.getElementById('password2') as HTMLInputElement;

        if (validateSignUp(userEmail.value, password1.value, password2.value)) {
            createUser(userEmail.value, password1.value);
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
                            <input type="password" className='register' placeholder="Password" id='password1' required />
                            <input type="password" className='register' placeholder="Confirm Password" id='password2' required />
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