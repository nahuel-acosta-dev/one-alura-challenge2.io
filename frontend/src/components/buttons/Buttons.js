import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';


const Buttons = ({buttons}) => {

    return (
        <>
            {buttons.map((btn, i) => (
                <Col key={i} sm={6} xs={12}>
                    <Button variant={btn['color']} className="btn-custom" onClick={btn['func']}>{btn['text']}</Button>
                </Col>
            ))}
        </>
    )

}

Buttons.propTypes = {
    buttons: PropTypes.array,
}



export default Buttons;