import React from 'react';
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const HomeApp = () =>{
    return(
        <Row className="home align-content-center">
            <Col md={4} sm={3} xs={1}></Col>
                <Col md={4} sm={6} xs={10}>
                    <Row>
                        <Stack gap={2} className="col-md-5 mx-auto">
                            <Button variant="secondary" size="lg">Iniciar Juego</Button>
                            <Button variant="outline-secondary" size="sm">Agregar una nueva palabra</Button>
                        </Stack>
                    </Row>
                </Col>
            <Col md={4} sm={3} xs={1}></Col>
        </Row>
    )
}

export default HomeApp;