"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
import axios from "axios";
import { getServerUrl } from "@/common/cfg";
import { handleError } from "@/common/utils";
import { Errors } from "@/common/errors";
import { getEmail } from "@/common/header";

interface LoginResponse {
    accessToken: string;
}

export default function Login() {
    const [loginState, setLoginState] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState([] as string[]);
    const [loggingIn, setLoggingIn] = useState(false);

    function onLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let err: string[] = [];
        if (!loginState.email) {
            err = [...err, "Nincs email megadva!"];
        }
        if (!loginState.password) {
            err = [...err, "Nincs jelszó megadva!"];
        }
        setErrors(err);
        if (err.length > 0) {
            return;
        }
        setLoggingIn(true);
        axios
            .post<LoginResponse>(getServerUrl("users/login"), loginState)
            .then((res) => {
                setLoggingIn(false);
                // TODO nem biztonságos
                localStorage.setItem("jwt", res.data.accessToken);
                window.location.href = "/";
            })
            .catch((err) => {
                setLoggingIn(false);
                handleError(err, setErrors);
            });
    }

    return (
        <main>
            <div className="login_parent to_center">
                <Form
                    onSubmit={onLogin}
                    className="format to_center_login"
                    autoComplete="false"
                >
                    <Errors errors={errors}></Errors>

                    <Form.Group
                        className="form_group mb-3"
                        controlId="formBasicEmail"
                    >
                        <Form.Label>Email cím</Form.Label>
                        <Form.Control
                            className="form_control"
                            type="text"
                            placeholder="Email"
                            onChange={(event) => {
                                const value = event.target.value;
                                setLoginState({ ...loginState, email: value });
                            }}
                        />
                    </Form.Group>

                    <Form.Group
                        className="form_group mb-3"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control
                            className="form_control"
                            type="password"
                            placeholder="Jelszó"
                            onChange={(event) => {
                                const value = event.target.value;
                                setLoginState({
                                    ...loginState,
                                    password: value,
                                });
                            }}
                        />
                    </Form.Group>

                    <div className="to_center">
                        <Button
                            className="mybutton"
                            variant="primary"
                            type="submit"
                            active={loggingIn}
                        >
                            Bejelentkezés
                        </Button>
                    </div>
                    <div className="to_center">
                        <Button
                            href="/forgot-password"
                            variant="link"
                            type="submit"
                        >
                            Elfelejtett jelszó
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    );
}
