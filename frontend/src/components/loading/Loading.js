import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () =>{

    return (
    <div className="height_maximum d-flex justify-content-center align-content-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
    </div>        
    )
}

export default Loading;