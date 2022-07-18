import React from 'react';

const GuestResponseNotification = ({notification}) =>{

    return(
        notification.answered ?
            (
                <span>
                    {
                        notification.response ?
                        <>
                        el user {notification.guest_user} 
                            a aceptado tu invitacion
                        </>
                        :
                        <>
                            el user {notification.guest_user} 
                            a rechazado tu invitacion
                        </>
                    }
                </span>
            )
            :
            (
                <span>
                    el user {notification.guest_user} no ha respondido
                </span>
            )
    )
}

export default GuestResponseNotification;