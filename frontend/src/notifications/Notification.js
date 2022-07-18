import React, {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import {useGetNotificationsQuery} from './notificationsApiSlice';
import GuestResponseNotification from '../components/notifications/GuestResponseNotification';
import HostResponseNotification from '../components/notifications/HostResponseNotification';
import Loading from '../components/loading/Loading';
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
    const [connection, setConnection] = useState(false);
    const [sendResponse, setSendResponse] = useState(false);
    const [newNotification, setNewNotification] = useState(false);

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

    //poner una barra a las invitaciones y maximo de height para evitar que se hagan muy grande

    useEffect(() =>{
        if(sendResponse){
            setTimeout(() => {
                setSendResponse(false);
                return navigate('/app/online/gamestarts')
            }, 5000)
        }
    }, [sendResponse])

    if(socket){
        socket.onopen = (e) => {
            console.log("[open] Connection established");
            setConnection(true);
        }

        socket.onmessage = function(e) {
            const data = JSON.parse(e.data);

            if(data.send_type === 'invitation'){
                handleRefetchOne();
                setNewNotification(true);
            }
            else if(data.send_type === 'response' && data.response){
                setSendResponse(true);
            }
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
    }

    //falta agregar un lugar donde se agregen los nuevos mensajes un array donde recibirlos,
    //y donde ponerlo en el render

    return(
    sendResponse ?
    (<span>Espere...</span>)    
    :
     <NavDropdown
        id="nav-dropdown-dark-example"
        title={
            newNotification ?
            <i class="bi bi-bell-fill nav-icon-active"></i>
            :
            <i className="bi bi-bell nav-icon"></i>
        }
        menuVariant="dark"
        className="nav-dropdown"
        onClick={() => setNewNotification(false)}
        >
        {isLoading &&
            <Loading/>
        } 
        {
        (notifications ?
            (isSuccess &&
            !connection ?
                (<Loading/>)
                :
                notifications.slice().reverse().map((notification, i) => {
                return(
                    <div key={i}>  
                        <NavDropdown.Item>{
                        notification.host_user == user.id ?
                        (
                            <GuestResponseNotification notification={notification} />
                        ) 
                        : 
                        (
                        <HostResponseNotification notification={notification}>
                            {
                            socket === null ?
                                <Loading/>
                                :
                                (
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
                                </Row>
                                )
                            }
                        </HostResponseNotification>
                        )
                        }
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                    </div>  
                )
            })
        ) 
        : 
        (
            <span>Data no available</span>
        )
    )
    }
    </NavDropdown>
    )
}

export default Notification;