import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modes from '../components/modes/Modes';
import Joystick from '../image/joystick.svg';
import Avatar from '../image/avatar.svg';
import {Link} from 'react-router-dom';

const GameMode = () =>{
    const modes = [
        {
            title: 'PvP',
            text: 'Crea una palabra y invita a alguien en linea a que la descubra',
            url: "/app/local/savescreen",
            img: {Avatar},
            background: '$green',
            colorTitle: '#71ed5e',
            width: '50'
        },
        {
            title: 'Local',
            text: 'Has que tu compañero descubra la palabra que acabas de crear',
            url: "/app/online/savescreen",
            img: {Joystick},
            background: '$green',
            colorTitle: '#f2b73a',
            width: '50'
        }
    ]
    
    return (
        <Row className="modes height_maximum d-flex align-content-center justify-content-center">
            {
                modes.map((mode, i) => (
                    <Modes key={i} 
                        title={mode.title} 
                        text={mode.text} 
                        url={mode.url}
                        img={mode.img}
                        background={mode.background}
                        colorTitle={mode.colorTitle}
                        width={mode.width}
                    />
                ))
            }
        </Row>
    )
}

export default GameMode;