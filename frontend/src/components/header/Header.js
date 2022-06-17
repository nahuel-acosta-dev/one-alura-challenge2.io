import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Vector from '../../image/Vector.svg';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { logOut } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from '../../features/auth/authSlice';
import {Link} from 'react-router-dom';

const Header = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();

    const logout = () => dispatch(logOut());
    

    return(
        <header>
            <Navbar expand="sm">
                <Container fluid>
                    <Navbar.Brand href="#home">
                    <img
                        src={Vector}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="alura logo"
                    />
                    {
                        user && user.username
                    }
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            {
                                token ? (<Button variant="link" onClick={logout} className="navbar-links">Logout</Button>):
                                (<Button variant="link" className="navbar-links"><Link to="/auth/login">Login</Link></Button>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;