"use client";

import { Form, Button } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";
import { getEmail } from "@/common/header";
import { ListMessages } from "./list-messages";
import { User } from "@/common/models/user";
import { MessagesService } from "@/common/services/messages.service";
import { Errors } from "@/common/errors";
import { handleError } from "@/common/utils";

export interface MessagesProp {
    who: Partial<User> | undefined;
}

function send(
    event: FormEvent<HTMLButtonElement>,
    other: string,
    message: string,
    setMessage: (_: string) => void,
    setErrors: (_: string[]) => void,
) {
    event.preventDefault();
    MessagesService.send(other, message)
        .then(() => {
            setMessage("");
            window.location.href = `pms?with=${other}`;
            const objDiv = document.getElementById("messages-list");
            if (objDiv) {
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        })
        .catch((err) => {
            handleError(err, setErrors);
        });
}

export function Messages({ who }: MessagesProp) {
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    return (
        <div className="flex_child_mail">
            <div className="mail">
                <p className="main_white_color blue_border">{`${
                    who?.familyname ?? ""
                } ${who?.forename ?? ""} (${who?.email ?? ""})`}</p>
                <ListMessages who={who}></ListMessages>
                <div className="send_mail">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Control
                                as="textarea"
                                onChange={(event) => {
                                    setMessage(event.target.value);
                                }}
                                value={message}
                            />
                        </Form.Group>

                        <div className="to_center">
                            <Button
                                className="mail_button m-2"
                                variant="primary"
                                onClick={(event) =>
                                    send(
                                        event,
                                        who?.email ?? "",
                                        message,
                                        setMessage,
                                        setErrors,
                                    )
                                }
                            >
                                Küldés
                            </Button>
                            <Button
                                className="mail_button m-2"
                                variant="primary"
                                href={`/pms?with=${who?.email}`}
                            >
                                Frissítés
                            </Button>
                        </div>
                        <Errors errors={errors}></Errors>
                    </Form>
                </div>
            </div>
        </div>
    );
}
