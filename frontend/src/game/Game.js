import React, {useEffect, createRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PhoneMode from '../components/responsive-game/PhoneMode';
import Hangman from '../components/hangman/Hangman';
import GameOver from '../components/game-over/GameOver';
import PropTypes from 'prop-types';
import {useNavigate, useLocation} from 'react-router-dom';

const Game = ({wordData, updateRoomApi, setWord,  setErrMsg}) => {
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
    const [keyboard, setKeyboard] = useState(false);
    
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

    const gameResult = (obj, result) => {
        obj.activated = false;
        obj.gameOver = true;
        obj.winner = result;
        setGameOver(true);
        setKeyboard(false);
    }

    useEffect(() => {
        let newWordData = wordData;
        newWordData.right = wordsFound;
        newWordData.failures = failures;
        if(failures.length > 5){
            let result = false;
            //si tenemos mas fallas de las permitidas llamamos a la api
            //y le informamos que hemos perdido la partida
            gameResult(newWordData, result);
        }
        else if(wordsFound.join('') == word.toUpperCase()){
            let result = true;
            //si al juntar el array de aciertos se forma la partida dada
            //llamamos a la api diciendole que ganamos
            gameResult(newWordData, result);
        }

        localStorage.setItem('word', JSON.stringify(newWordData));

        if(wordData.type == 'online'){
            updateRoomApi(newWordData);
        }

    }, [wordsFound, failures]);

    const checkGameStatus = (letter, code) => {

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
            setErrMsg('Ya introduciste esa letra');
            return false;
        }

        setErrMsg('');
        //entre estos numeros se encuentran las letras mayusculas en codigo ascii
        if(code >= 65 && code <= 90) return searchLyrics(letter); 
        //else if(code >= 97 && code <= 122) return searchLyrics(letter);//Minusculas si es necesario
        else return false;

    }
    
    const handleKeyDown = (e) => {
        const letter = e.key.toUpperCase();
        const code = letter.charCodeAt(); //obtenemos el codigo ascii de la letra en mayuscula

        return checkGameStatus(letter, code);
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
            <Col md={2} xs={1}>
      </Col>
            <Col md={8} xs={10}>
                {
                !gameOver ? 
                (<>
                    <Hangman failures={failures}/>
                    <Button variant={
                        keyboard ? "success" : "danger"} size="sm" onClick={() => setKeyboard(
                        keyboard ? false : true
                    )}>
                        <i className="bi bi-keyboard"></i>
                    </Button>
                    <Row className="gameStarts__letters 
                        align-items-end text-center justify-content-center"
                    >
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
                </>)
                :
                (
                    <GameOver word={word} result={failures.length > 5 ? false : true}/>
                )
                }

                {
                    keyboard ? 
                    (<PhoneMode checkGameStatus={checkGameStatus} />)
                    :
                    (
                        <Row className="gameStarts__buttons d-flex 
                            align-items-center justify-content-center">
                        <Col sm={6} xs={12}>
                            {
                                wordData.type != 'online' &&
                                <Button variant="info" className="btn-custom" onClick={newGame}>
                                    Nuevo juego
                                </Button>
                            }
                            </Col>
                                <Col sm={6} xs={12}>
                                {
                                    !gameOver ?
                                    (<Button variant="danger" 
                                        className="btn-custom" onClick={endGame}
                                    >
                                        Desistir
                                    </Button>)
                                    :
                                    (<Button variant="danger" 
                                        className="btn-custom" onClick={endGame}
                                    >
                                        Volver
                                    </Button>)
                                }
                        </Col>           
                    </Row>

                    )

                }

                
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