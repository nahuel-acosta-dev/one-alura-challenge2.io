import React, {useState, useRef, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from '../components/loading/Loading';
import {useSetPasswordMutation} from '../users/passwordApiSlice';
import { selectCurrentUser } from '../features/auth/authSlice';
import {useSelector} from "react-redux";

const SetPassword = () =>{
    const user = useSelector(selectCurrentUser);
    const pwdRef = useRef();
    const errRef = useRef();
    const [newPassword, { isLoading }] = useSetPasswordMutation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [response, setResponse] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        pwdRef.current.focus();
    }, []);

    const handlePwdInput = (e) => setPassword(e.target.value);

    const handleConfirmPwdInput = (e) => setConfirmPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            return setErrMsg("Las contraseñas no son iguales");
        }

        try{

            const changePassword = await newPassword({
                'password': password,
                'password2': confirmPassword,
                'id' : user.id
        })
            console.log(changePassword);
            setPassword('');
            setConfirmPassword('');
            setResponse(true);
            setErrMsg('');
        }
        catch(err){
            if (err.status === 400){
                setErrMsg("Las contraseñas no son iguales");
            }
            else if (err.status === 401){
                setErrMsg("La informacion enviada no es correcta");
            }
            else {
                setErrMsg("No server Response");
            }
            errRef.current.focus();
        }

    }


    return(
        <Row>
            <Col xs={2}></Col>
            <Col>
            {
                response ?
                <p>Tu contraseñe fue actualizada con exito</p>
                :
                (<>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nueva Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Nueva Contraseña"
                        onChange={handlePwdInput} value={password} ref={pwdRef}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Confirmar Contraseña"
                        onChange={handleConfirmPwdInput} value={confirmPassword}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Confirmar
                    </Button>
                </Form>
                </>)}
            </Col>
            <Col xs={2}></Col>
        </Row>
    )

}

export default SetPassword;