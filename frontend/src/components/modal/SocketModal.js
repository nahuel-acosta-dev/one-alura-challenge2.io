import React, {useState, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../loading/Loading';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useSelector} from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import PropTypes from 'prop-types';

const SocketModal = ({id, wordId}) =>{
    const user = useSelector(selectCurrentUser);
    const [smShow, setSmShow] = useState(false);
    const [socketModal, setSocketModal] = useState(smShow ? 
        new WebSocket(`ws://localhost:8000/ws/invitation/${id}/`) : null);
    const [invited, setInvited] = useState(false);
    const [connection, setConnection] = useState(false);
        
    useEffect(() => {
        if(smShow){
            setSocketModal(new WebSocket(`ws://localhost:8000/ws/invitation/${id}/`))
        }
    }, [smShow])

    if(socketModal){
        socketModal.onopen = (e) => {
            console.log("[open] Connection established")
            console.log('conectado al socket del modal')
            setConnection(true);
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

    const submitMessage = (e) =>{
        e.preventDefault();
    
        let message = "invitation"
        socketModal.send(JSON.stringify({
            'send_type':  message,
            'host_id': user.id,
            'response': '',
            'word_id': wordId
        }))
        setInvited(true);
    }



    return (<>
        <Modal
            size="sm"
            show={smShow}
            onHide={closeAll}
            aria-labelledby="example-modal-sizes-title-sm"
            className="modal"
        >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <p className="modal-title">Deseas invitar a este jugador</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
            {
            socketModal && user ?
            (
                connection ?
                <>
                    <Col>
                        <Button variant="info" onClick={e => submitMessage(e)}>enviar</Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={() => setSmShow(false)}>cerrar</Button>
                    </Col>
                </> 
                :
                <Loading/>
            )
                :
                <Loading/>
            }
            </Row>
        </Modal.Body>
      </Modal>
        {
            !invited &&
                <Button variant="primary" onClick={() => {setSmShow(true)}}>
                    <i className="bi bi-plus-lg"></i>
                </Button>

        }
      </>

    )
}

SocketModal.propTypes = {
    id: PropTypes.number
}

export default SocketModal;