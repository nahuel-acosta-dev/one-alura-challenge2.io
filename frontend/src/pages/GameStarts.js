import React, {useEffect, createRef, useCallback, useState} from 'react';
import Buttons from '../components/buttons/Buttons';
import Textarea from '../components/textarea/Textarea';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Ellipse from '../image/Ellipse.svg';
import Body from '../image/Body.svg';
import Armone from '../image/Armone.svg';
import Armtwo from '../image/Armtwo.svg';
import Legone from '../image/Armone.svg';
import Completo from '../image/Completo.svg';


const GameStarts = () => {
    const drawerRef = createRef();
    const palabra = "powerups";
    const [arrayPalabra, setArrayPalabra] = useState(palabra.split(''));
    const arrayOriginal = palabra.split('').map(() => {return ""});
    const [wordsFound, setWordsFound] = useState([...arrayOriginal]);

    const newGame = () => console.log('el array1');
    const toGiveUp = () => console.log('el array2');
/*
    console.log(wordsFound);
    console.log(arrayPalabra);*/

    useEffect(() => {
        //autoapuntado al div principal para ingresar letras directamente
        if (drawerRef) {
          drawerRef.current.focus();
        }
      }, [drawerRef]);

    const searchLyrics = (e) => {
        let index = arrayPalabra.indexOf(e);
        console.log(wordsFound)
        /*//console.log(wordsFound)
        let modArray = [...wordsFound];
        //console.log(modArray);
        modArray[index] = e;
        
        const nuevo = [...arrayPalabra];
        //console.log(nuevo);
        nuevo[index] = "";
        */
        
        //setWordsFound(wordsFound => [...modArray]);
        setArrayPalabra(arrayPalabra => arrayPalabra[index] === "");
        setWordsFound(wordsFound => wordsFound[index] === e);
        
        return console.log(arrayPalabra)
        /*console.log(index);
        console.log(wordsFound);
        console.log(arrayPalabra);*/
        //setArrayPalabra(arrayPalabra => arrayPalabra[0] == "");
    }

    const handleKeyDown = useCallback(
        (e) => {
            let code = e.key.charCodeAt();

            if(e.key.length > 1){
                //Verifica que la tecla ingresadad no sea ninguna espeacial
                //ejemplo Capslock o Enter
                return false;
            }

            if(code >= 65 && code <= 90){
                //console.log(String.fromCodePoint(code));
                return searchLyrics(e.key);
            }
            else if(code >= 97 && code <= 122){
                //console.log(String.fromCodePoint(code));
                return searchLyrics(e.key);
            }
            else return false;
        },[]);

    const buttons = [
        {
            color: 'primary',
            text:"Nuevo juego",
            func: newGame
        },
        {
            color: 'secondary',
            text:"Desistir",
            func: toGiveUp
        }
    ]

    return(
        <Row className="gameStarts" ref={drawerRef} onKeyDown={handleKeyDown} tabIndex={0}>
            <Col md={2} xs={1}></Col>
            <Col md={8} xs={10}>
                <div className="gameStarts__hangman">
                    <img src={Completo} />
                    {/*<Row className="post">
                        <div className="post__rest"></div>
                        <div className="post__ellipse"></div>
                        <div className="corp">
                            <div className="corp__armOne"></div>
                            <div className="corp__body"></div>
                            <div className="corp__armTwo"></div>
                            <div className="corp__legOne"></div>
                            <div className="corp__legTwo"></div>
                        </div>
                    </Row>
                    <div className="soil"></div>*/}
                </div>
                <Row className="gameStarts__letters align-items-end text-center justify-content-center">
                    {
                    wordsFound && 
                        wordsFound.map((letter, i) => (
                        <Col xs={1} key={i} className="letter">
                            <span>{letter}</span>
                        </Col>
                    ))}
                </Row>
                <Row className="gameStarts__buttons align-items-center justify-content-center">
                    <Buttons buttons={buttons} />
                </Row>
            </Col>
            <Col md={2} xs={1}></Col>
        </Row>
    )
}

export default GameStarts;