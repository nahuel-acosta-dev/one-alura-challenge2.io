import React, {useState} from 'react';
import SaveWord from '../words/SaveWord';
import SaveRoom from '../rooms/SaveRoom';
import Game from '../game/Game';
import {Navigate, useLocation} from 'react-router-dom';

const GameStarts = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const [word, setWord] = useState(() => 
    {
        if(!JSON.parse(localStorage.getItem("word"))){
            //si localStorage esta vacio devolvemos null
            console.log('entro al primero')
            return null;
        }
        const getWord = JSON.parse(localStorage.getItem("word"));
        console.log(getWord);

        if(getWord.gameover == true) return null; //si el juego esta terminado devolvemos null
        //si las rutas y el tipo coincide con lo que pedimos devuelve la informacion
        else if(pathname == getWord.url && getWord.type == 'fast'){
            return getWord
        }

        else if(pathname == getWord.url && getWord.type == 'local'){
            return getWord
        }

        else if(pathname == getWord.url && getWord.type == 'online'){
            return getWord
        }

        else return null;
        } 
    );

    console.log(location.pathname)
    console.log(word)
   
    return (
        <>
        {pathname == '/app/local/fast_play/gamestarts' ?
            (
                word == null ?
                <SaveWord setWord={setWord}/>
                :
                (<Game wordData={word} />)
            )
            :
            pathname == '/app/local/gamestarts' ?
            (
            word == null ?
                (<Navigate to="/app/local/savescreen"/>)
                :
                (<Game wordData={word} />)
            )
            :
            pathname == '/app/online/gamestarts' ?
            (
            word == null ?
                (<SaveRoom setWord={setWord}/>)
                :
                (<Game wordData={word} setWord={setWord}/>)
            )
            :
            <span>Error</span>   
        }    

        </>
        )
}

export default GameStarts;