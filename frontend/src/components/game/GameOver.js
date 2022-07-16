import React from 'react';

const GameOver = ({word, result}) =>{

    return(
        <>
            <p>Gracias por jugar la partida a terminado</p>
            <p>Tu palabra era {word}</p>
            <p>
                    {result ? "has ganado la partida" : "has perdido la partida"}
            </p>
        </>
    )

}

export default GameOver;