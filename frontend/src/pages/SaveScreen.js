import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Textarea from '../components/textarea/Textarea';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Info from '../image/Info.svg';
import {useSelector} from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import {useCreateWordMutation} from '../words/createWord';
import {useNavigate, Link} from 'react-router-dom';


const SaveScreen = () => {
    const [word, setWord] = useState('');
    const [apiWord, { isLoading }] = useCreateWordMutation();
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const handleWordInput = (e) => setWord(e.target.value);

    const createWordSubmit = async (e) => {
        e.preventDefault();
        try{
            //llamada api word
            const create = await apiWord({'user':user.id, 'word': word}).unwrap();
            console.log(create);
            setWord('');
            navigate('/app/gameStarts');
            localStorage.setItem('word', JSON.stringify(create));
            //tal vez sea mejor guardardar en la base de datos la partida
        }
        catch(err){
            if(!err.response){
                setErrMsg("No server Response");
            }
            else if (err.response?.status){
                setErrMsg("Falling servers logout");;
                console.log(err.response?.status)
            }
        }
        
    }

    const buttons = [
        {
            color: 'primary',
            text:"Guardar y empezar"
        }
    ]

    return (
    
        isLoading 
        ? (<h1>Loading...</h1>):
        (<Row className="saveScreen">
            <Col md={3} xs={1}></Col>
            <Col md={6} xs={10}>
                <Form onSubmit={(e) => createWordSubmit(e)}>
                    <Row className="saveScreen__Textarea">
                        <Textarea text="Ingrese una palabra" handleWordInput={handleWordInput}/>
                    </Row>
                    <Row className="saveScreen__buttons align-items-center align-items-md-center align-items-sm-center
                    justify-content-center">
                        <Col sm={6} xs={12}>
                            <Button variant="primary" >Guardar y empezar</Button>
                        </Col>
                        <Col sm={6} xs={12}>
                            <Link to="/app/home" className="btn btn-secondary">Cancelar</Link>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col md={3} xs={1}></Col>
        </Row>)
    )
}

export default SaveScreen;
//creating functionalities for Savescreen