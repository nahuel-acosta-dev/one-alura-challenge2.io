import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../../image/logo.svg';

const Auth = ({children}) => {
    return(
        <Container className="auth">
            <Row>
            <Col xs={1} lg={3} sm={2}></Col>
                <Col className="d-flex justify-content-end">
                    <img
                        src={Logo}
                        alt="logo sixLives"
                        height="80"
                    />
                </Col>
                <Col className="d-flex justify-content-start align-content-center">
                    <h2>sixLives</h2>
                </Col>
                <Col xs={1} lg={4} sm={2}></Col>
            </Row>
            <Row className="height_maximum">
                <Col xs={1} lg={4} sm={2}></Col>
                <Col className="auth__form">
                    {children}
                </Col>
                <Col xs={1} lg={4} sm={2}></Col>
            </Row>
        </Container>
    )
}

export default Auth;