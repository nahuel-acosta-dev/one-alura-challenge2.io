import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from '../features/auth/authSlice';

const HomeApp = () =>{
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    let tokenAbbr = "vacio"
    if(token){
    tokenAbbr = `${token.slice(0, 9)}...`}


    return(
        <Row className="home align-content-center">
            <h2>{
                user ? `Welcome ${user.username}!` : 'Welcome!'
            }</h2>
            <h2>Token: {
                tokenAbbr
            }</h2>
            <Col md={4} sm={3} xs={1}></Col>
                <Col md={4} sm={6} xs={10}>
                    <Row>
                        <Stack gap={2} className="col-md-5 mx-auto">
                            *<Button variant="secondary" size="lg">Iniciar Juego</Button>
                            <Button variant="outline-secondary" size="sm">Agregar una nueva palabra</Button>
                        </Stack>
                    </Row>
                </Col>
            <Col md={4} sm={3} xs={1}></Col>
        </Row>
    )
}

export default HomeApp;