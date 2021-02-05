import './SignIn.css';
import Button from 'react-bootstrap/Button'

export default function SignIn() {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <form className="box">
                            <h1>Login</h1>
                            <p className='text'> Please enter your login and password!</p>
                            <input type="text" name="" placeholder="Username" />
                            <input type="password" name="" placeholder="Password" />
                            <a className="forgot text" href="/">Forgot password?</a>
                            <Button className='submit' variant="outline-info">Sign In</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}