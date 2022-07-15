import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const PhoneMode = ({checkGameStatus}) =>{
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    console.log(alphabet);
    const getButtonLetter = (letter) => {
        const code = letter.charCodeAt();

        return checkGameStatus(letter, code);
    }


    return(
        <div>
        {
            alphabet.map((letter,i) => (
                <ButtonGroup key={i} aria-label="Third group">
                    <Button onClick={(letter) => getButtonLetter(letter)}>
                        {letter}
                    </Button>
                </ButtonGroup>
            ))
        }
        </div>
    )

}

export default PhoneMode;