"use client";

import { Errors } from "@/common/errors";
import { Room } from "@/common/models/room";
import { RoomsService } from "@/common/services/rooms.service";
import { handleError } from "@/common/utils";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export interface EditRoomProps {
    room: Room;
}

export function EditRoom({ room }: EditRoomProps) {
    const [size, setSize] = useState(room.size);
    const [errors, setErrors] = useState<string[]>([]);
    return (
        <tr>
            <td>
                <p>{room.name}</p>
            </td>
            <td>
                <Form.Control
                    type="number"
                    value={size}
                    onChange={(event) => setSize(Number(event.target.value))}
                ></Form.Control>
            </td>
            <td>
                <Button
                    className="m-1"
                    variant="primary"
                    onClick={(event) => {
                        event.preventDefault();
                        RoomsService.edit({ id: room.id, size })
                            .then(() => (window.location.href = "/admin/rooms"))
                            .catch((e) => handleError(e, setErrors));
                    }}
                >
                    Mentés
                </Button>
                <Button
                    className="m-1"
                    variant="danger"
                    onClick={(event) => {
                        event.preventDefault();
                        RoomsService.delete(room.id)
                            .then(() => {
                                window.location.href = "/admin/rooms";
                            })
                            .catch((e) => handleError(e, setErrors));
                    }}
                >
                    Törlés
                </Button>
                <Errors errors={errors}></Errors>
            </td>
        </tr>
    );
}
