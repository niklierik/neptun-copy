"use client";

import { Errors } from "@/common/errors";
import { UsersService } from "@/common/services/users.service";
import { handleError } from "@/common/utils";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    return (
        <>
            <main>
                <div className="to_center">
                    <Form>
                        <Form.Group
                            className="mb-3 form_group"
                            controlId="formBasicText"
                        >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </Form.Group>
                        <div className="to_center">
                            <Button
                                variant="primary"
                                onClick={(event) => {
                                    event.preventDefault();
                                    UsersService.forgotPassword(email)
                                        .then((token) =>
                                            console.log(
                                                (window.location.href =
                                                    "/change-password?token=" +
                                                    token),
                                            ),
                                        )
                                        .catch((e) =>
                                            handleError(e, setErrors),
                                        );
                                }}
                            >
                                Új jelszó kérése
                            </Button>
                        </div>
                        <Errors errors={errors}></Errors>
                    </Form>
                </div>
            </main>
        </>
    );
}
