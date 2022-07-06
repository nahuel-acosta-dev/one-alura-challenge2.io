import React, {useState} from 'react';
import SaveWord from '../words/SaveWord';
import Game from '../game/Game';
import {useLocation} from 'react-router-dom';

const GameStarts = () => {
    const [word, setWord] = useState(() => {
        if(JSON.parse(localStorage.getItem("word"))){
            const getWord = JSON.parse(localStorage.getItem("word"));

        }
        
    }        
    );
    const location = useLocation();

    console.log(location.pathname)
    console.log(word)
   
    return (
        <>
        {location.pathname == '/app/local/fast_play/gamestarts' &&
            (
                word == null ?
                <SaveWord setWord={setWord}/>
                :
                (<Game word={word.word} />)
            )          
        }     

        </>
        )
}

export default GameStarts;