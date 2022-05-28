import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../components/buttons/Buttons';
import Textarea from '../components/textarea/Textarea';
import Form from 'react-bootstrap/Form';
import Info from '../image/Info.svg';

const SaveScreen = () => {
    const save = () => console.log('el array1');
    const cancel = () => console.log('el array2');

    const buttons = [
        {
            color: 'primary',
            text:"Guardar y empezar",
            func: save
        },
        {
            color: 'secondary',
            text:"Cancelar",
            func: cancel
        }
    ]

    

    buttons.map((button) => console.log(button['color']))

    return(
        <Row className="saveScreen">
            <Col md={3} xs={1}></Col>
            <Col md={6} xs={10}>
                <Form>
                    <Row className="saveScreen__Textarea">
                        <Textarea text="Ingrese una palabra" />
                    </Row>
                    <Row className="saveScreen__buttons align-items-center align-items-md-center align-items-sm-center
                    justify-content-center">
                        <Buttons buttons={buttons} />
                    </Row>
                </Form>
            </Col>
            <Col md={3} xs={1}></Col>
        </Row>
    )
}

export default SaveScreen;