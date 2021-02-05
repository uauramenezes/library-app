import './style/Authorization.css';
import Button from 'react-bootstrap/Button'

export default function SignIn() {
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <form className="box">
                            <h1>Register</h1>
                            <p className='text'> Please enter an email and password!</p>
                            <input type="text" className='signUp' placeholder="Username" />
                            <input type="text" className='signUp' placeholder="Confirm Username" />
                            <input type="password" className='signUp' placeholder="Password" />
                            <input type="password" className='signUp' placeholder="Confirm Password" />
                            <Button className='submit' variant="outline-info">Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}