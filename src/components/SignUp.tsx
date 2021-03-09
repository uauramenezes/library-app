import Button from 'react-bootstrap/Button'

export default function SignUp() {

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <form className="box">
                            <h1>Register</h1>
                            <p className='text'> Please enter an email and password!</p>
                            <input type="email" className='login' placeholder="Email" id='email' required />
                            <input type="password" className='login' placeholder="Password" id='password1' required />
                            <input type="password" className='login' placeholder="Confirm Password" id='password2' required />
                            <p id="error-msg"></p>
                            <Button className='submit' variant="outline-info">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}