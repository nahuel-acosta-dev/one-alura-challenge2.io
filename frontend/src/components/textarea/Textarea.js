import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({text, handleWordInput, max, word}) => {

    return(
        <>
            <textarea className="form__textarea" minLength={2} pattern="[A-Za-z]+" value={word} placeholder={text} 
            onChange={handleWordInput} maxLength={max} title="Letras y números. Tamaño mínimo: 5. Tamaño máximo: 40"
            required></textarea>
        </>
    )
}

Textarea.propTypes = {
    text: PropTypes.string,
    handleWordInput: PropTypes.func,
    max: PropTypes.string
}

export default Textarea;