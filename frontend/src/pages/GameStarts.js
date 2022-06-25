import React from 'react';
import {useListWordsQuery} from '../words/ListWordApiSlice';
import Game from '../game/Game';

const GameStarts = () => {
    const {
        data: words,
        isLoading,
        isSuccess,
        isError,
        error
    } = useListWordsQuery();
   
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