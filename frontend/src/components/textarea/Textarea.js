import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({text, handleWordInput}) => {

    return(
        <>
            <textarea className="form__textarea" placeholder={text} onChange={handleWordInput}></textarea>
        </>
    )
}

Textarea.propTypes = {
    text: PropTypes.string,
    handleWordInput: PropTypes.func
}

export default Textarea;