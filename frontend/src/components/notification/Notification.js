import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import {useGetNotificationsQuery} from '../../utils/notifications/notificationsApiSlice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown'

const Notification = () =>{
    //tal vez dejar el socket en el header no sea la forma mas prolija talvez dejarlo en el app sea mejor
    //si se encuentra una mejor manera intentarlo si no dejarlo asi
    const user = useSelector(selectCurrentUser);
    const [socket, setSocket] = useState(user ? 
        new WebSocket(`ws://localhost:8000/ws/invitation/${user.id}/`) : null);

        const {
            data: notifications,
            isLoading,
            isSuccess,
            isError,
            error,
            refetch
        } = useGetNotificationsQuery();

    useEffect(() => {
        if(user){
            setSocket(new WebSocket(`ws://localhost:8000/ws/invitation/${user.id}/`))
        }
    },[user])

    if(socket){
        socket.onopen = (e) => {
            console.log("[open] Connection established")
        }

        socket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            console.log(data)
        }   
    /*
        socket.onclose = function (e) {
            console.log('Connection closed');
        };

        socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
          };*/
    }

    const handleRefetchOne = () => {
        // force re-fetches the data
        refetch()
      }
    
    
    const submitMessage = (e, response) =>{
        e.preventDefault();
    
        let message = "response"
        socket.send(JSON.stringify({
                'send_type': message,
                'guest_id': '',
                'response': response,
                'word_id': ''
        }))
        handleRefetchOne();

        //debo buscar una manera de obtener la palabra y luego se guarda en localStorage y se redirige
        //a gamestart, seria bueno crear una sala en models tambien y si la sala estan sin terminar
        //notificar al usuario en la pagina app/home con un modal.

        //o crear una sala con la palabra ya para esta usuario y si responde que si activarla y 
        //redirigir al usuario
        //si responde no simplemente borrarla o desactivarla desde el consumer
        //la sala podria tener un codigo, que tambien comparta con el model invitations
        //o simplemente obtener la ultima sala entre los 2 usuarios, no pueden tener mas de 1
        //sala activa entre los 2 usuarios
        
    }

    return(
     <NavDropdown
        id="nav-dropdown-dark-example"
        title="Dropdown"
        menuVariant="dark"
        >
        {isLoading &&
        <p>"Loading..."</p>} 
        {notifications ?
            (isSuccess &&
            notifications.map((notification, i) => {
                return(
                <div key={i}>  
                    <NavDropdown.Item href="#action/3.1">{notification.host_user == user.id ?
                    (
                        notification.answered ?
                        (
                            <span>
                                {notification.response ?
                                    <>el user {notification.guest_user} a aceptado tu invitacion</>
                                    :
                                    <>el user {notification.guest_user} a rechazado tu invitacion</>
                                }
                            </span>
                        )
                        :
                        (
                            <span>el user {notification.guest_user} no ha respondido</span>
                        )
                    ) 
                    : 
                    (
                        notification.answered ? 
                        (
                            notification.response == true ?
                            <span>Has aceptado la propuesta</span>
                            :
                            <span>Has rechazado la propuesta o no la has respondido</span>
                        )
                        :
                        (
                            <>
                            <span>
                                el user {notification.host_user} te ha invitado
                            </span>
                            {
                            socket == null ?
                                <span>Loading...</span> 
                                :
                            (//falta poner algo mientras el socket.ready... no conecte(diferente de 1)
                            <Row>
                                <Col><Button variant="primary"  
                                    onClick={e => submitMessage(e, true)} size="sm">Aceptar</Button>
                                </Col>
                                <Col>
                                    <Button variant="danger"  
                                    onClick={e => submitMessage(e, false)} size="sm">Rechazar</Button>
                                </Col>
                            </Row>)}
                            </>
                        )
                    )
                }</NavDropdown.Item>
                    <NavDropdown.Divider />
                </div>  
                )

                })
            ) 
            : 
            (
            <span>Data no available</span>
            )
        }
    </NavDropdown>
    )
}

export default Notification;