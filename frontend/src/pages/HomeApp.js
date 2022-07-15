import React, {useState,useEffect} from 'react';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Modes from '../components/modes/Modes';
import Fast from '../image/fast.svg';
import Plus from '../image/plus.svg';
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

    const modes = [
        {
            title: 'Juega',
            text: 'Juega una partida rapida con una palabra al azar',
            url: "/app/local/fast_play/gamestarts",
            img: {Fast},
            background: '$green',
            colorTitle: '#71ed5e',
            width: '20'
        },
        {
            title: 'Agrega',
            text: 'Agrega una palabra y elige como jugar',
            url: "/app/gamemode",
            img: {Plus},
            background: '$green',
            colorTitle: '#f2b73a',
            width: '30'
        }
    ]

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
        <Row className="modes height_maximum d-flex align-content-center justify-content-center">
            {
                modes.map((mode, i) => (
                    <Modes key={i} 
                        title={mode.title} 
                        text={mode.text} 
                        url={mode.url}
                        img={mode.img}
                        background={mode.background}
                        colorTitle={mode.colorTitle}
                        width={mode.width}
                    />
                ))
            }
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