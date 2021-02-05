import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function NavBar() {
    let width = window.innerWidth;
    
    if (width < 450) {
        return(
            <Navbar bg="dark" variant="dark">
                <NavDropdown title="Library App" id="basic-nav-dropdown" className='drop-down'>
                    <NavDropdown.Item href="/">Home</NavDropdown.Item>
                    <NavDropdown.Item href="/">About</NavDropdown.Item>
                    <NavDropdown.Item href="/">Library</NavDropdown.Item>
                </NavDropdown>
                <Form inline>
                    <Button variant="outline-info" className='mr-sm-2 button' href="/sign-in">
                        Sign In
                    </Button>
                    <Button variant="outline-info" className='button' href='sign-up'>Sign Up</Button>
                </Form>
            </Navbar>
        )
    } else {
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/" className='title'>Library App</Navbar.Brand>
                <Nav className="mr-auto" id='nav'>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#features">About</Nav.Link>
                    <Nav.Link href="#pricing">Library</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="outline-info" className='mr-sm-3' href="/sign-in">
                        Sign In
                    </Button>
                    <Button variant="outline-info" href='sign-up'>Sign Up</Button>
                </Form>
            </Navbar>
        )
    }
}