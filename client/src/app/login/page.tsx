"use client";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login() {

    return <main>
        <div className="login_parent to_center">
            <Form className="format to_center_login ">
                <Form.Group className="form_group mb-3" controlId="formBasicEmail">
                    <Form.Label>Email cím</Form.Label>
                    <Form.Control className="form_control" type="email" placeholder="Email" />
                </Form.Group>

                <Form.Group className="form_group mb-3" controlId="formBasicPassword">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control className="form_control" type="password" placeholder="Jelszó" />
                </Form.Group>

                <div className="to_center">
                    <Button className="mybutton" variant="primary" type="submit">
                        Bejelentkezés
                    </Button>
                </div>
            </Form>
        </div>


    </main>

}