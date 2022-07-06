import React, {useEffect} from 'react';
import {useWordLastQuery} from './getWordLastApiSlice';

const SaveWordId = ({setWordId}) =>{
        const {
            data: word,
            isLoading,
            isSuccess,
            isError,
            error
        } = useWordLastQuery();

        useEffect(() =>{
            if(isSuccess){
                localStorage.setItem('word_id', JSON.stringify(word.id))
                setWordId(JSON.parse(localStorage.getItem('word_id')));
            }
        },[isSuccess, isLoading])

        console.log(word)

        return <span>Loading</span>

}

export default SaveWordId;