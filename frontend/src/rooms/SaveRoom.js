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
            const newWord = {
                word: word,
                type:'online',
                url: location.pathname,
                right: room.hits,
                failures: room.failures,
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