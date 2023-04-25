"use client";

import { Form, Button } from "react-bootstrap";

export default function RegisterEnd() {
    return (
        <main>
            <div className="to_center">
                <Form>
                    <Form.Group
                        className="mb-3 form_group"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control type="password" placeholder="Jelszó" />
                    </Form.Group>
                    <Form.Group
                        className="mb-3 form_group"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Jelszó újra</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Jelszó újra"
                        />
                    </Form.Group>
                    <div className="to_center">
                        <Button variant="primary" type="submit">
                            Regisztráció befejezése
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    );
}
