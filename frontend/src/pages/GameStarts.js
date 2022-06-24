import React, {useState} from 'react';
import {useListWordsQuery} from '../words/getListWord';
import Game from '../game/Game';

const GameStarts = () => {
    const [word, setWord] = useState('');
    const {
        data: words,
        isLoading,
        isSuccess,
        isError,
        error
    } = useListWordsQuery();

    const getWord = () => setWord(words[Math.floor(Math.random() * words.length)].word);

    if(isSuccess){
        console.log(words); 
    }

   
    return (
        <>{
        isLoading &&
            <p>"Loading..."</p>}
        {isSuccess &&
        (<Game word={words[Math.floor(Math.random() * words.length)].word} />)
        
        }
        </>
        )
}

export default GameStarts;