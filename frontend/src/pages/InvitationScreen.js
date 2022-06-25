import React from 'react';
import {useGetUsersQuery} from '../users/usersApiSlice';

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
                    return <li key={i}>{user.username}</li>
                })}
            </ul>
        </section>}
        </>

    )

}

export default InvitationScreen;