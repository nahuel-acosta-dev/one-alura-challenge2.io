import React, {useEffect} from 'react';
import {useListWordsQuery} from './ListWordApiSlice';

const SaveWord = ({setWord}) =>{
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