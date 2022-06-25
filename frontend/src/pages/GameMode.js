import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';

const GameMode = () =>{
    
    return (
        <Row className="gameMode">
            <Col xs={6}>
                <Link to="/app/local/savescreen" className="btn btn-secondary btn-lg">Crea y juega</Link>
            </Col>
            <Col xs={6}>
                <Link to="/app/online/savescreen" className="btn btn-secondary btn-lg">Crea y invita</Link>
            </Col>
        </Row>
    )
}

export default GameMode;