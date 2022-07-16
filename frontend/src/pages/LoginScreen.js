import React, {useState, useRef, useEffect} from 'react';
//import {googleLogin} from "../actions/authActions";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { setCredentials } from '../features/auth/authSlice';
import {useLoginMutation} from '../features/auth/authApiSlice';
import Loading from '../components/loading/Loading';
import Auth from '../components/auth/Auth';


const LoginScreen = () =>{
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();


    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() =>  {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            //llama a la api lofin
            const userData = await login({username, password}).unwrap();
            console.log(userData);
            //guardamos los datos en las credebciales
            dispatch(setCredentials({ ...userData, username }));
            setUser('');
            setPassword('');
            navigate('/app/home')
        }catch(err){
            if (err.status === 400){
                setErrMsg("Missing Username or Password");
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

    const handleUserInput = (e) => setUser(e.target.value);

    const handlePwdInput = (e) => setPassword(e.target.value);

    return (
        <>
        {
        isLoading ? (<Loading/>)
        :
        (
        <Auth>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                     <Form.Control type="text" placeholder="Ingresa tu Usuario" 
                    ref={userRef} value={username} onChange={handleUserInput}
                    autoComplete="off" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Ingresa tu contraseña" 
                    onChange={handlePwdInput} value={password} required/>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="info" type="submit" size="sm">
                        Iniciar sesión
                    </Button>
                </div>
            </Form>
        </Auth>
        )}
        </>
        )
    
    }

export default LoginScreen;