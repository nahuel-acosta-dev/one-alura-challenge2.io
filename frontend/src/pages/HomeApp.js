import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';

const HomeApp = () =>{

    return(
        <Row className="home align-content-center">
            <Col md={4} sm={3} xs={1}></Col>
                <Col md={4} sm={6} xs={10}>
                    <Row>
                        <Stack gap={2} className="col-md-5 mx-auto">
                            <Link to="/app/local/fast_play/gamestarts" className="btn btn-secondary btn-lg">Juego Rapido</Link>
                            <Link to="/app/gamemode" className="btn btn-outline-secondary btn-sm">Agregar una nueva palabra</Link>
                        </Stack>
                    </Row>
                </Col>
            <Col md={4} sm={3} xs={1}></Col>
        </Row>
    )
}

export default HomeApp;