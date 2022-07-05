import React from 'react';
import {useGetUsersQuery} from '../users/usersApiSlice';
import SocketModal from '../components/modal/SocketModal';


/*para saber si un usuario esta activo y en linea, podemos hacer que se agrege una columna
a su modelo User llamado online(Boolean), y que atravez de los canales cada vez que el usuario
entre y se conecte al canal, al final de ese consumer se envie un put al sql poniendo online True 
al usuario*/

const InvitationScreen = () =>{

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();


    return (<>
        {isLoading &&
            <p>"Loading..."</p>}  
        
        {isSuccess &&
        <section className="users">
            <h1>Users List</h1>
            <ul>
                {users.map((user, i) => {
                    console.log(user)
                    /*podriamos hacer que mediante un modal nos conectemos al socket
                    una vez enviada la solicitud cerramos la coneccion con ese socket 
                    el modal nos avisa que la notificacion fue enviada con exito y tambien nos saque
                    podemos seguir jugando o invitando,hasta mientras la invitacion enviada al usuario
                    nos aparecera sin responder hasta que responda. pero nosotros podemos seguir jugando
                    si responde nos aparece un puntito en notificaciones y nos avisa, pero lo que
                    responda no afectara nuestro juego mas que parapuntaje
                    deberiamos poner un limite de invitaciones o que solo se puedan hacer cada cierto tiempo 
                    */
                    return <li key={i}>
                        {user.username}{' '} <SocketModal id={user.id}/>
                    </li>
                })}
            </ul>
        </section>}
        </>

    )

}

export default InvitationScreen;