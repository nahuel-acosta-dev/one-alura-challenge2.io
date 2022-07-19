import React from 'react';

const GuestResponseNotification = ({notification}) =>{

    return(
        notification.answered ?
            (
                <span>
                    {
                        notification.response ?
                        <>
                        {notification.guest_user.username} 
                            a aceptado tu invitacion
                        </>
                        :
                        <>
                            {notification.guest_user.username} 
                            a rechazado tu invitacion
                        </>
                    }
                </span>
            )
            :
            (
                <span>
                    {notification.guest_user.username} no ha respondido
                </span>
            )
    )
}

export default GuestResponseNotification;