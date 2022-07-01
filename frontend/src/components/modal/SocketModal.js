import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const SocketModal = ({id}) =>{
    const [smShow, setSmShow] = useState(false);
    const [socketModal, setSocketModal] = useState(smShow ? 
        new WebSocket(`ws://localhost:8000/ws/invitation/${id}/`) : null);

    useEffect(() => {
        if(smShow){
            setSocketModal(new WebSocket(`ws://localhost:8000/ws/invitation/${id}/`))
        }
    }, [smShow])

    if(socketModal){
        socketModal.onopen = (e) => {
            console.log("[open] Connection established")
            console.log('conectado al socket del modal')
        }
    
        socketModal.onmessage = function(e) {
            console.log(e)
            const data = JSON.parse(e.data);
            console.log(data)
        }
        
        socketModal.onclose = function (evt) {
            console.log('WebSocket desconectado');
          };

        socketModal.onerror = function(error) {
            console.log(`[error] ${error.message}`);
          }
        }

    const closeAll = () => {
        console.log(socketModal.readyState)
        socketModal.close(1000, 'socket close en return');
        console.log('socket cerrado')
        setSmShow(false);
    }
    console.log(socketModal)

    const submitMessage = (e) =>{
        e.preventDefault();
    
        let message = "enviado al usuario"
        socketModal.send(JSON.stringify({
                'send_type': message
        }))
    }



    return (<>
        <Modal
            size="sm"
            show={smShow}
            onHide={closeAll}
            aria-labelledby="example-modal-sizes-title-sm"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
            socketModal ?
                <>
                    <Button variant="info" onClick={e => submitMessage(e)}>enviar</Button>
                    <Button variant="danger">cerrar</Button>
                </> :
                <span>loading...</span>
            }
        </Modal.Body>
      </Modal>
        <Button variant="primary" onClick={() => setSmShow(true)}>invitar</Button>
      </>

    )
}

SocketModal.propTypes = {
    id: PropTypes.number
}

export default SocketModal;