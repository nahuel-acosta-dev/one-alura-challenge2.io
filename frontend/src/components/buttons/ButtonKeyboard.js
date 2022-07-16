import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ButtonKeyboard = ({keyboard, setKeyboard}) =>{

    return(
        <Button variant={
            keyboard ? "success" : "danger"} size="sm" onClick={() => setKeyboard(
            keyboard ? false : true
        )}>
            <i className="bi bi-keyboard"></i>
        </Button>
    )
}

ButtonKeyboard.propTypes = {
    keyboard: PropTypes.bool,
}

export default ButtonKeyboard;