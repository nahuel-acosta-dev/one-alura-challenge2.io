import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';

const ProfileScreen = () =>{

    return(
        <Row>
            <Col xs={1} sm={4}></Col>
            <Col xs={10} sm={4}>
                <Link className="btn btn-danger" to="/app/set_password">Cambiar contraseña</Link>
            </Col>
            <Col xs={1} sm={4}></Col>
        </Row>
    )
    
}

export default ProfileScreen;