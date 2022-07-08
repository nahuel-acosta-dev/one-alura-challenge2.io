import React, {useEffect} from 'react';
import {useGetRoomQuery} from './getRoomApiSlice';
import {useLocation} from 'react-router-dom';

const SaveRoom= ({setWord}) =>{
    const location = useLocation();
    const {
        data: room,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetRoomQuery();

    useEffect(() =>{
        if(isSuccess){
            let word = room.word['word']
            let hits = room.hits;
            let failures = room.failures;
            
            const newWord = {
                id: room.id,
                word: word,
                type:'online',
                url: location.pathname,
                right: (hits == '' ? word.split('').map(() =>  ".") 
                : 
                hits.split('').map(letter =>  letter)),
                failures: failures.split('').map(letter => letter),
                gameover: room.gameover,
                winner: room.winner
            }
            localStorage.setItem(
                'word', JSON.stringify(newWord))
            setWord(JSON.parse(localStorage.getItem('word')));
        }
    },[isSuccess, isLoading])

    console.log(room)

    return <span>Loading</span>

}

export default SaveRoom;