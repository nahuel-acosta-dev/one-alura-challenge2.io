import React, {useState, useEffect, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import {useDispatch} from "react-redux";
import {useRegisterMutation} from '../features/auth/registerApiSlice';
import Loading from '../components/loading/Loading';
import Auth from '../components/auth/Auth';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () =>{
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [register, { isLoading }] = useRegisterMutation();
    const [errMsg, setErrMsg] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() =>  {
        setErrMsg('');
    }, [username, password]);

    useEffect(() => {
        if(redirect){
            setTimeout(() => navigate('/auth/login'), 5000)
            
        }
    }, [redirect])

    const handleUsernameInput = (e) => setUsername(e.target.value);

    const handleEmailInput = (e) => setEmail(e.target.value);

    const handlePwdInput = (e) => setPassword(e.target.value);

    const handleConfirmPwdInput = (e) => setConfirmPwd(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPwd){
            setErrMsg('Las contraseñas deben ser iguales')
            return false;
        }

        try{
            //llama a la api register
            const userData = await register({username, email, password}).unwrap();
            console.log(userData);
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPwd('');
            setRedirect(true);
        }catch(err){
            if (err.status === 400){
                setErrMsg("El nombre de usuario ya existe");
            }
            else if (err.status === 401){
                setErrMsg("Unauthorized");
            }
            else {
                setErrMsg("No server Response");
            }
            errRef.current.focus();
        }
    }


    return(
            redirect ?
            (
            <>
                <p>Te has registrado con exito</p>
                <p>espere sera redireccionado para que pueda iniciar sesion</p>
            </>
            )
            :
            (
            isLoading ? 
            (<Loading />)
            :
            <Auth>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <Form noValidate onSubmit={e => handleSubmit(e)}>
                    <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            onChange={handleUsernameInput}
                            value={username}
                            ref={userRef} 
                            autoComplete="off"
                            required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor ingresa tu username
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustomEmail">
                        <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                type="email"
                                placeholder="email"
                                aria-describedby="inputGroupPrepend"
                                onChange={handleEmailInput}
                                value={email}
                                required
                                />
                                <Form.Control.Feedback type="invalid">
                                Por favor ingresa tu email
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Contraseña"
                            onChange={handlePwdInput}
                            value={password}
                            required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfirm">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Confirmar Contraseña" 
                            onChange={handleConfirmPwdInput}
                            value={confirmPwd}
                            required
                            />
                        </Form.Group>
                    </Row>
                    <div className="d-grid gap-2">
                        <Button variant="info" type="submit" size="sm">Registrarse</Button>
                    </div>
                </Form>
            </Auth>
            )
        
    )
}

export default RegisterScreen;