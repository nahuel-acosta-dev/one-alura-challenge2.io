import React from 'react';

const HostResponseNotification = ({notification, children}) =>{

    return(
        notification.answered ? 
        (
            notification.response == true ?
                <span>
                    Has aceptado la propuesta
                </span>
                :
                <span>
                    Has rechazado la propuesta o no la has respondido
                </span>
        )
        :
        (
        <>
            <span>
                el user {notification.host_user} te ha invitado
            </span>
            {children}
        </>
       )
    )
}

export default HostResponseNotification;