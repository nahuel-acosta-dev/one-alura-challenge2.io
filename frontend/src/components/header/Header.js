import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Vector from '../../image/Vector.svg';
import Container from 'react-bootstrap/Container';
const Header = () => {
    return(
        <header>
            <Navbar>
                <Container fluid>
                    <Navbar.Brand href="#home">
                    <img
                        src={Vector}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="alura logo"
                    />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;