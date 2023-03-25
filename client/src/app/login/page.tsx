"use client";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { getServerUrl } from '@/common/cfg';

interface LoginResponse {
    accessToken: string;
}


export default function Login() {

    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState([] as string[]);
    const [loggingIn, setLoggingIn] = useState(false);

    function onLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let err: string[] = [];
        if (!loginState.email) {
            err = ([...err, "Nincs email megadva!"]);
        }
        if (!loginState.password) {
            err = ([...err, "Nincs jelszó megadva!"])
        }
        setErrors(err);
        if (err.length > 0) {
            return;
        }
        setLoggingIn(true);
        axios.post<LoginResponse>(getServerUrl("users/login"), loginState).then(res => {
            setLoggingIn(false);
            // TODO nem biztonságos
            localStorage.setItem("jwt", res.data.accessToken);

        }).catch(err => {
            setLoggingIn(false);
            setErrors([...errors, JSON.stringify(err)]);
        })
    }

    return <main>
        <div className="login_parent to_center">
            <Form onSubmit={onLogin} className="format to_center_login " >

                {errors.length == 0 ? <></> : <div className="error_div">
                    {
                        errors.map(error => <p>{error}</p>)
                    }
                </div>}

                <Form.Group className="form_group mb-3" controlId="formBasicEmail">
                    <Form.Label>Email cím</Form.Label>
                    <Form.Control className="form_control" type="email" placeholder="Email" onChange={(event) => {
                        const value = event.target.value;
                        setLoginState({ ...loginState, email: value });
                    }} />
                </Form.Group>

                <Form.Group className="form_group mb-3" controlId="formBasicPassword">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control className="form_control" type="password" placeholder="Jelszó" onChange={(event) => {
                        const value = event.target.value;
                        setLoginState({ ...loginState, password: value });
                    }} />
                </Form.Group>

                <div className="to_center">
                    <Button className="mybutton" variant="primary" type="submit" active={loggingIn}>
                        Bejelentkezés
                    </Button>
                </div>
            </Form>
        </div>

    </main>

}