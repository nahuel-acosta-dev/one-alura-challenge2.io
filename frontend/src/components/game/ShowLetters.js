import React from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types'

const ShowLetters = ({letters}) =>{


    return(
        <>
            {
                letters.map((letter, i) => (
                    <Col xs={1} key={i} className="letter">
                        <span>{letter}</span>
                    </Col>))
            }
        </>
    )
}

ShowLetters.propTypes = {
    letters: PropTypes.array
}


export default ShowLetters;
