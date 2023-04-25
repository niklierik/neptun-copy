"use client";

import { Form, Button } from "react-bootstrap";

export default function ForgotPassword() {
    return (
        <main>
            <div className="to_center">
                <Form>
                    <Form.Group
                        className="mb-3 form_group"
                        controlId="formBasicText"
                    >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Email" />
                    </Form.Group>
                    <div className="to_center">
                        <Button variant="primary" type="submit">
                            Új jelszó kérése
                        </Button>
                    </div>
                </Form>
            </div>
        </main>
    );
}
