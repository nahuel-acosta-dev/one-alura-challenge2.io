import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from '../../image/logo.svg';
import GitHub from '../../image/github.svg';
import Linkedin from '../../image/linked.svg';
import Email from '../../image/email.svg';
import Phone from '../../image/phone.svg';

const Footer = () =>{

    return(
            <footer className="sticky-bottom">
                <Container className="height_maximum" fluid>
                    <Row className="footer-container height_maximum">
                        <Col xs={6} className="height_maximum">
                            <Row className="height_maximum align-content-center">
                                <Col sm={6} xs={4} className="footer-img d-flex justify-content-end height_maximum">
                                    <img
                                    src={Logo}
                                    width="50px"
                                    />
                                </Col>
                                <Col sm={6} xs={8}>
                                    <p className="copyright">
                                        &copy; Copyright: Nahuel Acosta 2022
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={6}>
                        <Row className="height_maximum align-content-center">
                            <Col sm={6} xs={6} className="icon-cont d-flex justify-content-end">
                                <a href="https://github.com/nahuel43038" target="_blank">
                                    <img
                                        src={GitHub}
                                        width="35px"
                                    />
                                </a>
                            </Col>
                            <Col sm={2} xs={6} className="icon-cont d-flex justify-content-center">
                                <a href="https://www.linkedin.com/in/nahuel-acosta-2b5423188"
                                target="_blank">
                                    <img
                                        src={Linkedin}
                                        width="30px"
                                    />
                                </a>
                            </Col>
                            <Col sm={2} xs={6} className="icon-cont d-flex justify-content-end">
                                <a href="mailto:brianacostanahuel2000@gmail.com">
                                    <img
                                        src={Email}
                                        width="40px"
                                    />
                                </a>
                            </Col>
                            <Col sm={2} xs={6} className="icon-cont d-flex justify-content-center">
                                <a href="tel:+541164729851">
                                    <img
                                        src={Phone}
                                        width="23px"
                                    />
                                </a>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                </Container>
            </footer>
    )

}

export default Footer;