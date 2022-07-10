import React, {useState,useEffect} from 'react';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import {useGetRoomQuery} from '../rooms/getRoomApiSlice';
import {useUpdateRoomMutation} from '../rooms/updateRoomApiSlice.js'
import {Link, useNavigate} from 'react-router-dom';

const HomeApp = () => {
    const [smShow, setSmShow] = useState(false);
    const [update, {}] = useUpdateRoomMutation();
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const {
        data: room,
        isLoading,
        isSuccess,
        isError
    } = useGetRoomQuery();

    useEffect(() =>  {
        if(isSuccess){
            setSmShow(true);
        }
    }, [isLoading]);

    localStorage.removeItem('word');

    const continueGame = () => navigate('/app/online/gamestarts');

    const leaveGame = async () => {
            try{
                const updateRoom = await update({
                    "hits": room.hits,
                    "failures": room.failures,
                    "activated": false,
                    "game_over": true,
                    "winner": false,
                    "id": room.id
                }).unwrap();
                setSmShow(false);
                console.log(updateRoom)
            }

            catch(err){
                if(!err.response){
                    setErrMsg("No server Response");
                    console.log("No server Response");
                }
                else if (err.response?.status){
                    setErrMsg("Falling servers");
                    console.log(err.response?.status);
                }
            }
    }
    

    return(
        <>
        <Row className="home align-content-center">
            <Col md={4} sm={3} xs={1}></Col>
                <Col md={4} sm={6} xs={10}>
                    <Row>
                        <Stack gap={2} className="col-md-5 mx-auto">
                            <Link to="/app/local/fast_play/gamestarts" className="btn btn-secondary btn-lg">Juego Rapido</Link>
                            <Link to="/app/gamemode" className="btn btn-outline-secondary btn-sm">Agregar una nueva palabra</Link>
                        </Stack>
                    </Row>
                </Col>
            <Col md={4} sm={3} xs={1}></Col>
        </Row>
        

        <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
            >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Recordatorio
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tenes Una partida pendiente, deseas continuarla?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={continueGame}>
                    Continue
                </Button>
                <Button variant="danger" onClick={leaveGame}>
                    leave Game
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default HomeApp;