import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({text}) => {

    return(
        <>
            <textarea className="form__textarea" placeholder={text}></textarea>
        </>
    )
}

Textarea.propTypes = {
    text: PropTypes.string,
}

export default Textarea;