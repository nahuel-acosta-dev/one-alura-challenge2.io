import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import {useGetNotificationsQuery} from '../../notifications/notificationsApiSlice';
import Loading from '../loading/Loading';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from 'react-router-dom';

const Notification = () =>{
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [socket, setSocket] = useState(user ? 
        new WebSocket(`ws://localhost:8000/ws/invitation/${user.id}/`) : null);
    console.log(socket)
        
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
    
        socket.onclose = function (e) {
            console.log('Connection closed');
        };

        socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
          };
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
                'host_id': user.id,
                'response': response,
                'word_id': ''
        }))
        handleRefetchOne();
        
        if(response){
            //antes de redireccionar debo esperar a que se cree la partida
            //tarda unos momentos y al redireccionar tan rapido no llega a obtener la partida
            //tal vez podria obtener la partida a travez de una llamada a la api
            navigate('/app/online/gamestarts');
        }
    }

    //falta agregar un lugar donde se agregen los nuevos mensajes un array donde recibirlos,
    //y donde ponerlo en el render

    return(
     <NavDropdown
        id="nav-dropdown-dark-example"
        title={<i className="bi bi-bell nav-icon"></i>}
        menuVariant="dark"
        className="nav-dropdown"
        >
        {isLoading &&
        <Loading/>} 
        {notifications ?
            (isSuccess &&
            notifications.map((notification, i) => {
                return(
                <div key={i}>  
                    <NavDropdown.Item>{notification.host_user == user.id ?
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
                                <Loading/>
                                :
                            (//falta poner algo mientras el socket.ready... no conecte(diferente de 1)
                            <Row>
                                <Col>
                                <Button variant="primary" 
                                    onClick={e => submitMessage(e, true)} size="sm">
                                        Aceptar
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="danger"  
                                    onClick={e => submitMessage(e, false)} size="sm">
                                        Rechazar
                                    </Button>
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