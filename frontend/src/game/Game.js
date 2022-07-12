import React, {useEffect, createRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Hangman from '../components/hangman/Hangman';
import GameOver from '../components/game-over/GameOver';
import PropTypes from 'prop-types';
import {useNavigate, useLocation} from 'react-router-dom';

//Hace falta agregar una version para movil ya que hay no hay butones para ingresar letras, debemos
/*ingresar un input de 1 letra que permita usar el teclado virtual del celular,
ponerle un boton para el usuario activar el modo movil o que la pantalle se de cuenta automaticamente
aunque eso traeria ciertos problemas a la hora de adaptarse. Es mejor el bton*/ 

/*o crear un teclado en la pantalla, esta dificil esta habria que crear mas funciones y
la pantalla tendria que darse cuenta de en que dimensiones esta.
O podriamos agregar un boton que le permita al usuario elegir el modo. es mejor el boton creo*/

//separar en componentes el modo escritorio y el modo movil, podriamos crear componentes 
//mas pequeños para las funcionalidades que compartarn el modo escritorio y movil.
//recordar una regla es que un componente no puede tener de hijo a otro, por lo tanto
//modo escritotio y movil no deben ir en carpeta componentes, ahi solo van los reutilizables

const Game = ({wordData, updateRoomApi, setWord}) => {
    const drawerRef = createRef();
    const word = wordData.word;
    const navigate = useNavigate();
    const [gameOver, setGameOver] = useState(false);
    //obtenemos un array con todas las letras de la word
    const [arrayWords, setArrayWords] = useState(word.toUpperCase().split(''));
    //obtenemos en un array la misma cantidad de espacios que letras tiene la word
    //const [wordsFound, setWordsFound] = useState(word.split('').map(() =>  ""));
    const [wordsFound, setWordsFound] = useState(wordData.right);
    const [failures, setFailures] = useState(wordData.failures);
    
    useEffect(() => {
        //autoapuntado al div principal para ingresar letras directamente
        if (drawerRef) drawerRef.current.focus();
    }, [drawerRef]);

    const modLetterArrays = (indexes, letter) => {
        console.log(letter)
        let modArray;
        if(letter != ""){
            modArray = [...wordsFound];
            //si letter no esta vacio copiamos el array de aciertos
            //agregaremos una nueva letra a este array
        }
        else{
            modArray = [...arrayWords];
            //si letter esta vacio copiamos el array principal
            //eliminaremos una letra de este array
        }
        //copiamos el array y luego lo modificamos por la letra dada
        indexes.forEach(index => modArray[index] = letter)
        console.log(modArray);
        return modArray;
    }

    const searchLyrics = (letter) => {
        //obtenemos la posicion de la letra en el array
        let index = arrayWords.indexOf(letter); 
        let indexes = []; 

        while (index != -1) {
            indexes.push(index);
            index = arrayWords.indexOf(letter, index + 1);
            //obtenemos todos los indices
          }
        console.log(indexes);

        if(indexes.length < 1){
            setFailures([...failures, letter]);
            console.log(failures);
            //si nos equivocamos sumamos una letra al array de errores
            return false;
        }

        //hacemos las llamadas y obtenemos los nuevos arrays
        setWordsFound(modLetterArrays(indexes, letter));
        setArrayWords(modLetterArrays(indexes, ""));

    }

    useEffect(() => {
        let newWordData = wordData;
        newWordData.right = wordsFound;
        newWordData.failures = failures;
        if(failures.length > 5){
            newWordData.activated = false;
            newWordData.gameOver = true;
            newWordData.winner = false;
            console.log('juego perdido');
            setGameOver(true);
        }
        else if(wordsFound.join('') == word.toUpperCase()){
            newWordData.activated = false;
            newWordData.gameOver = true;
            newWordData.winner = true;
            console.log('juego ganado');
            setGameOver(true);
        }

        localStorage.setItem('word', JSON.stringify(newWordData));

        if(wordData.type == 'online'){
            updateRoomApi(newWordData);
        }

    }, [wordsFound, failures])
    

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

        //entre estos numeros se encuentran las letras mayusculas en codigo ascii
        if(code >= 65 && code <= 90) return searchLyrics(letter); 
        //else if(code >= 97 && code <= 122) return searchLyrics(letter);//Minusculas si es necesario
        else return false;
    }

    const newGame = () => {
        setWord(null);
        localStorage.removeItem('word');
    }

    const endGame = () => {
        setWord(null);
        localStorage.removeItem('word');
        navigate('/app')
    }

    return(
        <Row className="gameStarts" ref={drawerRef} onKeyDown={handleKeyDown} tabIndex={0}>
            <Col md={2} xs={1}></Col>
            <Col md={8} xs={10}>
                {
                !gameOver ? 
                (<><Hangman failures={failures}/>
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
                </Row></>)
                :
                (<GameOver/>)
                }
                <Row className="gameStarts__buttons align-items-center justify-content-center">
                <Col sm={6} xs={12}>
                    {wordData.type != 'online' &&
                        <Button variant="primary" className="btn-custom" onClick={newGame}>Nuevo juego</Button>}
                </Col>
                    <Col sm={6} xs={12}>{
                        !gameOver ?
                        <Button variant="secondary" className="btn-custom" onClick={endGame}>Desistir</Button>
                        :
                        <Button variant="secondary" className="btn-custom" onClick={endGame}>Volver</Button>
                    }
                    </Col>    
                </Row>
            </Col>
            <Col md={2} xs={1}></Col>
        </Row>
    )
}

Game.propTypes = {
    wordData: PropTypes.object,
    updateRoomApi: PropTypes.func
}

export default Game;