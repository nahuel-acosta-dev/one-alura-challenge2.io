import React, {useEffect} from 'react';
import {useListWordsQuery} from './ListWordApiSlice';
import {useLocation} from 'react-router-dom';
import NotFoundWord from '../components/errors/NotFoundWord';

const SaveWord = ({setWord}) =>{
    const location = useLocation();
    const {
        data: words,
        isLoading,
        isSuccess,
        isError
    } = useListWordsQuery();

    console.log('estoy aqui')

    useEffect(() =>{
            if(isSuccess){
                let newWord = words[Math.floor(Math.random() * words.length)].word;
                const newWordData = {
                    word: newWord,
                    type:'fast',
                    url: location.pathname,
                    right: newWord.split('').map(() =>  "."),
                    failures: [],
                    gameover: false,
                    winner: false
                }
                localStorage.setItem(
                    'word', JSON.stringify(newWordData))
                setWord(JSON.parse(localStorage.getItem('word')));
            }
    },[isSuccess, isLoading])

        console.log(words)
    
    if(isError){
        return <NotFoundWord/>
    }

    if(isLoading){
        return <span>Loading</span>
    }

}

export default SaveWord;