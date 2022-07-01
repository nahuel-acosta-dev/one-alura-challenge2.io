import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown'

const Notification = () =>{
    //tal vez dejar el socket en el header no sea la forma mas prolija talvez dejarlo en el app sea mejor
    //si se encuentra una mejor manera intentarlo si no dejarlo asi
    const user = useSelector(selectCurrentUser);
    const [socket, setSocket] = useState(user ? 
        new WebSocket(`ws://localhost:8000/ws/invitation/${user.id}/`) : null);

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
    
    
    const submitMessage = (e) =>{
        e.preventDefault();
    
        let message = "nuestro mensaje"
        socket.send(JSON.stringify({
                'send_type': message
        }))
    }

    return(
     <NavDropdown
        id="nav-dropdown-dark-example"
        title="Dropdown"
        menuVariant="dark"
        >
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Divider />
        <Button variant="primary" onClick={e => submitMessage(e)}>Enviar</Button>
    </NavDropdown>
    )
}

export default Notification;