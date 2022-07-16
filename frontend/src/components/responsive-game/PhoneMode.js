import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const PhoneMode = ({checkGameStatus}) =>{
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    console.log(alphabet);
    const getButtonLetter = (letter) => {
        console.log(letter);
        const code = letter.charCodeAt();
        return checkGameStatus(letter, code);
    }


    return(
        <div className="phone d-md-flex">
       
            {
                alphabet.map((letter,i) => (
                    
                        <Button className="btn-letter" key={i} onClick={() => getButtonLetter(letter)} size="sm">
                            {letter}
                        </Button>
                    
                ))
            }
        
        </div>
    )

}
export default PhoneMode;