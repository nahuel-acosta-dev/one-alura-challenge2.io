import React from 'react';
import {useDispatch} from "react-redux";
import {googleLogin} from "../actions/authActions";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const LoginScreen = () =>{

    const dispatch = useDispatch();

    const handleGoogleLogin = (e) =>{
        dispatch(googleLogin('1', "nahuel"));
        e.preventDefault();
    }

    return (
        <section className="container">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="primary" type="info" onClick={e => handleGoogleLogin(e)}>
                    google
                </Button>
            </Form>
        </section>
    )
}

export default LoginScreen;