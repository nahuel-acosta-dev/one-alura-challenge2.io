import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({text, handleWordInput, max, word}) => {

    return(
        <>
            <textarea className="form__textarea" minLength={2} value={word} placeholder={text} 
            onChange={handleWordInput} maxLength={max} required></textarea>
        </>
    )
}

Textarea.propTypes = {
    text: PropTypes.string,
    handleWordInput: PropTypes.func,
    max: PropTypes.string,
    word: PropTypes.string
}

export default Textarea;