"use client";

import { Button, Form } from "react-bootstrap";
import { Message } from "./message";

export function Messaging() {
    return (
        <div>
            <div className="border_3px">
                <div className="center_news">
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label className="to_center main_white_color">
                                Új üzenet
                            </Form.Label>
                            <Form.Control as="textarea" rows={6} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Elküldés
                        </Button>
                        <Button
                            style={{ marginLeft: "20px" }}
                            variant="danger"
                            type="submit"
                        >
                            Mégsem
                        </Button>
                    </Form>
                </div>
            </div>
            <Message></Message>
            <Message></Message>
            <Message></Message>
        </div>
    );
}
