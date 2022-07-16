import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Feedback from 'react-bootstrap/Feedback';
import Loading from '../components/loading/Loading';
import Auth from '../components/auth/Auth';

const RegisterScreen = () =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() =>  {
        setErrMsg('');
    }, [username, pwd]);

    const handleUsernameInput = (e) => setUsername(e.target.value);

    const handleEmailInput = (e) => setEmail(e.target.value);

    const handlePwdInput = (e) => setPwd(e.target.value);

    const handleConfirmPwdInput = (e) => setConfirmPwd(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }


    return(
        <Auth>
            <Form noValidate>
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
                        value={pwd}
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
}

export default RegisterScreen;