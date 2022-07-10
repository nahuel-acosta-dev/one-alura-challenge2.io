import React, {useState} from 'react';
import {useGetProfilesQuery} from '../profiles/profilesApiSlice';
import {useSelector} from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import SocketModal from '../components/modal/SocketModal';
import { Navigate } from 'react-router-dom';


/*para saber si un usuario esta activo y en linea, podemos hacer que se agrege una columna
a su modelo User llamado online(Boolean), y que atravez de los canales cada vez que el usuario
entre y se conecte al canal, al final de ese consumer se envie un put al sql poniendo online True 
al usuario*/

const InvitationScreen = () =>{
    const [wordId, setWordId] = useState(() => localStorage.getItem("word_id") ? 
        JSON.parse(localStorage.getItem("word_id")) : null);
    const user = useSelector(selectCurrentUser)

    const {
        data: profiles,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfilesQuery();

    console.log(wordId)

    


    return (<>
        {isLoading &&
            <p>"Loading..."</p>}  
        
        {isSuccess &&
        <section className="users">
            <h1>Users List</h1>
            <ul>
                {profiles.map((profile, i) => {
                    console.log(profile)
                    /*podriamos hacer que mediante un modal nos conectemos al socket
                    una vez enviada la solicitud cerramos la coneccion con ese socket 
                    el modal nos avisa que la notificacion fue enviada con exito y tambien nos saque
                    podemos seguir jugando o invitando,hasta mientras la invitacion enviada al usuario
                    nos aparecera sin responder hasta que responda. pero nosotros podemos seguir jugando
                    si responde nos aparece un puntito en notificaciones y nos avisa, pero lo que
                    responda no afectara nuestro juego mas que parapuntaje
                    deberiamos poner un limite de invitaciones o que solo se puedan hacer cada cierto tiempo 
                */  if(profile.user.id !== user.id){ 
                        return <li key={i}>
                            {profile.user.username}{' '} 
                            {wordId == null ?
                                (<Navigate to="/app/online/savescreen"/>)
                                :
                                (<SocketModal id={profile.user.id} wordId={wordId}/>)
                            }
                        </li>
                    }
                })}
            </ul>
        </section>}
        </>

    )

}

export default InvitationScreen;