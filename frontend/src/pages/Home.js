import React from 'react';
import Logo from '../image/logo.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {Outlet, Link} from 'react-router-dom'

const Home = () =>{

    return (
        <section className="home height_maximum">
            <Row className="home__rows height_maximum">
                <Col sm={2}></Col>
                <Col sm={8} className="home__col height_maximum">
                    <div className="home__img d-flex align-content-center">
                        <img
                            src={Logo}//Al pasar el mouse debe cambiar de logo
                            className="home__logo"
                            alt="logo sixlives"
                        />
                    </div>
                    <div className="home__title text-center">
                        <h1>sixLives</h1>
                    </div>
                    <div className="home__button">
                        <Link className="btn btn-outline-info custom-btn" to="/auth/register">
                            Registrate es gratis
                        </Link>
                    </div>
                    <div className="home__text text-center">
                        <p>
                            Descubre <span>palabras</span> jugandos con tus <span>amigos</span> y 
                            demuestra que eres el mejor.
                            
                        </p>
                    </div>
                </Col>
                <Col sm={2}></Col>
            </Row>
            <Outlet />
        </section>
    )
}

export default Home;