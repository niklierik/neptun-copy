"use client";

import { Form } from "react-bootstrap";

export function SearchUsers({
    email,
    setEmail,
    name,
    setName,
}: {
    email: string;
    setEmail: (_: string) => void;
    name: string;
    setName: (_: string) => void;
}): JSX.Element {
    return (
        <div className="to_center border_3px">
            <Form className="format">
                <Form.Group
                    key="email"
                    className="mb-3 form_group"
                    controlId="formBasicText"
                >
                    <Form.Label className="to_center">Email cím</Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        onChange={(event) => {
                            event.preventDefault();
                            setEmail(event.target.value);
                        }}
                    />
                </Form.Group>
                {/*<Form.Group
                    key="name"
                    className="mb-3 form_group"
                    controlId="formBasicText"
                >
                    <Form.Label className="to_center">Név</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(event) => {
                            event.preventDefault();

                            setName(event.target.value);
                        }}
                    />
                    </Form.Group>*/}
            </Form>
        </div>
    );
}
