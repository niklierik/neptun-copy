"use client";

import { Form, Button } from "react-bootstrap";

export default function ChangePassword() {
    return (
        <main>
            <div className="to_center">
                <Form>
                    <Form.Group
                        className="mb-3 form_group"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Új jelszó</Form.Label>
                        <Form.Control type="password" placeholder="Új jelszó" />
                    </Form.Group>
                    <Form.Group
                        className="mb-3 form_group"
                        controlId="formBasicPassword"
                    >
                        <Form.Label>Új jelszó újra</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Új jelszó újra"
                        />
                    </Form.Group>
                    <div className="to_center">
                        <Button variant="primary" type="submit">
                            Jelszó megváltoztatása
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    );
}
