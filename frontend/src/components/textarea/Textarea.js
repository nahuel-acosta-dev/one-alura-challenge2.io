import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({text, handleWordInput, max}) => {

    return(
        <>
            <textarea className="form__textarea" placeholder={text} 
            onChange={handleWordInput} maxLength={max}></textarea>
        </>
    )
}

Textarea.propTypes = {
    text: PropTypes.string,
    handleWordInput: PropTypes.func,
    max: PropTypes.string
}

export default Textarea;