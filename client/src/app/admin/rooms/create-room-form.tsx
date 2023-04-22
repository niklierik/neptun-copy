"use client";

import { Errors } from "@/common/errors";
import { RoomsService } from "@/common/services/rooms.service";
import { handleError } from "@/common/utils";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export function CreateRoomForum() {
    const [form, setForm] = useState<any>({});
    const [errors, setErrors] = useState<string[]>([]);
    return (
        <div className="to_center border_3px">
            <Form className="format">
                <Form.Group
                    className="form_group mb-3"
                    controlId="formBasicText"
                >
                    <Form.Label>Terem neve</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Terem neve"
                        value={form.name}
                        onChange={(event) =>
                            setForm({ ...form, name: event.target.value })
                        }
                    />
                </Form.Group>
                <Form.Group
                    className="form_group mb-3"
                    controlId="formBasicText"
                >
                    <Form.Label>Terem kapacitása</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Terem kapacitása"
                        value={form.size}
                        onChange={(event) =>
                            setForm({
                                ...form,
                                size: Number(event.target.value),
                            })
                        }
                    />
                </Form.Group>
                <div className="to_center">
                    <Button
                        className="mybutton"
                        variant="primary"
                        onClick={(event) => {
                            event.preventDefault();
                            RoomsService.create(form)
                                .then(
                                    () =>
                                        (window.location.href = "/admin/rooms"),
                                )
                                .catch((e) => handleError(e, setErrors));
                        }}
                    >
                        Terem felvétele
                    </Button>
                </div>
            </Form>
            <Errors errors={errors}></Errors>
        </div>
    );
}
