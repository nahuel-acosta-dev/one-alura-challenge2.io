import React, {useEffect, createRef, useState} from 'react';
import Buttons from '../components/buttons/Buttons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Hangman from '../components/hangman/Hangman';

//Hace falta agregar una versio para movil ya que hay no hay butones para ingresar letras, debemos
//ingresar un input de 1 letra que permita usar el teclado virtual del celular

const GameStarts = () => {
    const drawerRef = createRef();
    const palabra = "powerups";
    const [arrayPalabra, setArrayPalabra] = useState(palabra.toUpperCase().split(''));
    const [wordsFound, setWordsFound] = useState(palabra.split('').map(() => {return ""}));
    const [failures, setFailures] = useState([]);

    if(failures.length > 5) console.log("Juego terminado");
    
    useEffect(() => {
        //autoapuntado al div principal para ingresar letras directamente
        if (drawerRef) drawerRef.current.focus();
    }, [drawerRef]);

    const addLyrics = (index, letter) => {
        //copiamos el array y luego lo modificamos por la letra dada
        const modArray = [...wordsFound];
        modArray[index] = letter;
        console.log(modArray);
        return modArray;
    }

    const deleteLyrics = (index) => {
        //copiamos el array y quitamos la letra, pero queda el espacio
        const modArray = [...arrayPalabra];
        modArray[index] = "";
        console.log(modArray);
        return modArray;
    }

    const searchLyrics = (letter) => {
        //obtenemos la posicion de la letra en el array
        let index = arrayPalabra.indexOf(letter); 
        console.log(index);

        if(index == -1){
            setFailures([...failures, letter]);
            console.log(failures);
            return false;
        }

        //hacemos las llamadas y obtenemos los nuevos arrays
        setWordsFound(addLyrics(index, letter));
        setArrayPalabra(deleteLyrics(index));
    }

    const handleKeyDown = (e) => {
        const letter = e.key.toUpperCase();
        const code = letter.charCodeAt(); //obtenemos el codigo ascii de la letra en mayuscula

        if(failures.length > 5) {
            console.log("No tienes mas intentos");
            return false;}

        else if(letter.length > 1){
            //Verifica que la tecla ingresada no sea ninguna especial
            //ejemplo Capslock o Enter
            return false;
        }
        else if(failures.includes(letter) || wordsFound.includes(letter)){
            //La letra ya fue ingresada
            console.log("Ya ingresaste esa letra");
            return false;
        }

        //entre estos numeros se encuentran las letras mayusculas
        if(code >= 65 && code <= 90) return searchLyrics(letter); 
        //else if(code >= 97 && code <= 122) return searchLyrics(letter);//Minusculas si es necesario
        else return false;
    }

    const newGame = () => console.log('el array1');
    const toGiveUp = () => console.log('el array2');

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
                <Hangman failures={failures}/>
                <Row className="gameStarts__letters align-items-end text-center justify-content-center">
                    {
                        wordsFound.map((letter, i) => (
                        <Col xs={1} key={i} className="letter">
                            <span>{letter}</span>
                        </Col>
                    ))}
                </Row>
                <Row className="gameStarts__failures text-center align-item-center justify-content-center">
                    {
                        failures.map((failure, i) => (
                            <Col xs={1} key={i} className="gameStarts__fails">
                                <span>{failure}</span>
                            </Col>
                        ))
                    }
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