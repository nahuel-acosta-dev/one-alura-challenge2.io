import React, {useState} from 'react';
import {useUpdateRoomMutation} from '../rooms/updateRoomApiSlice';
import SaveWord from '../words/SaveWord';
import SaveRoom from '../rooms/SaveRoom';
import Game from '../game/Game';
import {Navigate, useLocation} from 'react-router-dom';

const GameStarts = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const pathnames = {
        fast: '/app/local/fast_play/gamestarts',
        local: '/app/local/gamestarts',
        online: '/app/online/gamestarts'
    }
    const [update, { isLoading }] = useUpdateRoomMutation();
    const [errMsg, setErrMsg] = useState('');

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

    const updateRoomApi = async (wordData)  =>{
        try{
            const updateRoom = await update({
                "hits": wordData.right.join(''),
                "failures": wordData.failures.join(''),
                "activated": wordData.activated,
                "game_over": wordData.gameOver,
                "winner": wordData.winner,
                "id": wordData.id
            }).unwrap();

            console.log(updateRoom);
            
        }
        catch(err){
            if(!err.response){
                setErrMsg("No server Response");
                console.log("No server Response");
            }
            else if (err.response?.status){
                setErrMsg("Falling servers");
                console.log(err.response?.status);
            }
        }

}

    return (
        <>
        <span className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</span>
        {pathname == pathnames.fast ?
            (
                word == null ?
                <SaveWord setWord={setWord}/>
                :
                (<Game wordData={word} updateRoomApi={(() => false)} 
                setWord={setWord} setErrMsg={setErrMsg} />)
            )
            :
            pathname == pathnames.local ?
            (
            word == null ?
                (<Navigate to="/app/local/savescreen"/>)
                :
                (<Game wordData={word} updateRoomApi={(() => false)} 
                setWord={setWord} setErrMsg={setErrMsg}/>)
            )
            :
            pathname == pathnames.online ?
            (
            word == null ?
                (<SaveRoom setWord={setWord}/>)
                :
                (<Game wordData={word} updateRoomApi={updateRoomApi} 
                    setWord={setWord} setErrMsg={setErrMsg} />)
            )
            :
            <span>Error</span>   
        }    

        </>
        )
}

export default GameStarts;
