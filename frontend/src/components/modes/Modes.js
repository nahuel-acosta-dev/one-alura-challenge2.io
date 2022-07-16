import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LogoDefault from '../../image/logo.svg';
import Plus from '../../image/plus.svg';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Modes = ({background, img, title, text, url, colorTitle, width}) =>{

    return(
        <>
            <Col xs={12} sm="auto" className="modes__cont height_medium">
                    <div className="height_medium d-flex justify-content-center align-content-center">
                        <Link to={url} 
                        className="img__cont d-flex justify-content-center align-content-center"
                        style={{ backgroundColor: (background ? background : '$celestial')}}
                        >
                            <img
                                src={img ? img[Object.keys(img)[0]] : LogoDefault}
                                width={width}
                                alt="fast logo"
                            />
                        </Link>
                    </div>
                    <Row className="modes__info height_medium">
                        <Link to={url} 
                        className="height_medium d-flex justify-content-center align-content-center">
                            <h2
                            style={{ color: (colorTitle ? colorTitle : '$green')}}
                            >{title}</h2>
                        </Link>
                        <div className="height_medium d-flex justify-content-center align-content-center">
                            <p>{text}</p>
                        </div>
                    </Row>
            </Col>
        </>
    )

}

Modes.propTypes = {
    background: PropTypes.string,
    img: PropTypes.object,
    title: PropTypes.string,
    text: PropTypes.string, 
    url: PropTypes.string, 
    colorTitle: PropTypes.string, 
    width: PropTypes.string
}

export default Modes;