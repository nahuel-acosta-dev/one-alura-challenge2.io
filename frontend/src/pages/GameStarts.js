import React from 'react';
import Buttons from '../components/buttons/Buttons';
import Textarea from '../components/textarea/Textarea';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GameStarts = () => {
    const palabra = "powerups";
    const newGame = () => console.log('el array1');
    const toGiveUp = () => console.log('el array2');

    const buttons = [
        {
            color: 'primary',
            text:"Nuevo juego",
            func: newGame
        },
        {
            color: 'secondary',
            text:"Desistir",
            func: toGiveUp
        }
    ]

    return(
        <Row className="gameStarts">
            <Col md={2} xs={1}></Col>
            <Col md={8} xs={10}>
                <Row className="gameStarts__letters align-items-end text-center justify-content-center">
                    {palabra.split('').map((letter, i) => (
                        <Col xs={1} key={i} className="letter">
                            <span>{letter}</span>
                        </Col>
                    ))}
                </Row>
                <Row className="gameStarts__buttons align-items-center justify-content-center">
                    <Buttons buttons={buttons} />
                </Row>
            </Col>
            <Col md={2} xs={1}></Col>
        </Row>
    )
}

export default GameStarts;