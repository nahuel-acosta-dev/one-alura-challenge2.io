import React, {useEffect} from 'react';
import {useListWordsQuery} from './ListWordApiSlice';
import {useLocation} from 'react-router-dom';

const SaveWord = ({setWord}) =>{
    const location = useLocation();
    const {
        data: words,
        isLoading,
        isSuccess,
        isError,
        error
    } = useListWordsQuery();

    console.log('estoy aqui')

    useEffect(() =>{
            if(isSuccess){
                const newWord = {
                    word: words[Math.floor(Math.random() * words.length)].word,
                    type:'fast',
                    url: location.pathname,
                    right: [],
                    failures: [],
                    gameover: false,
                    winner: false
                }
                localStorage.setItem(
                    'word', JSON.stringify(newWord))
                setWord(JSON.parse(localStorage.getItem('word')));
            }
    },[isSuccess, isLoading])

        console.log(words)

    return <span>Loading</span>

}

export default SaveWord;