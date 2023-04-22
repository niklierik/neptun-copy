"use client";

import { Errors } from "@/common/errors";
import Header from "@/common/header";
import { CoursesService } from "@/common/services/courses.service";
import { ExamsService } from "@/common/services/exams.service";
import { RoomsService } from "@/common/services/rooms.service";
import { SubjectsService } from "@/common/services/subjects.service";
import { handleError } from "@/common/utils";
import { asyncTask } from "@/common/utils/async-task";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export interface ExamsProps {
    searchParams: {
        subjectID: string;
    };
}

export default function Exams({ searchParams }: ExamsProps) {
    const { subjectID } = searchParams;
    const roomState = useState("");
    const dateState = useState("");
    const timeState = useState("");
    const errorState = useState<string[]>([]);
    const { html: h1, data: subject } = asyncTask("subjects", () =>
        SubjectsService.getSubject(subjectID),
    );
    const { html: h2, data: rooms } = asyncTask("rooms", RoomsService.getRooms);
    if (h1) {
        return h1;
    }
    if (h2) {
        return h2;
    }
    return (
        <main>
            <Header></Header>

            <div className="main_white_color to_center">
                <p style={{ fontWeight: "bold", fontSize: 20 }}>
                    {subject?.name}: Vizsgakiírás
                </p>
            </div>

            <div className="to_center">
                <Form className="format">
                    <Form.Group className="mb-3 form_group">
                        <Form.Label>Dátum</Form.Label>
                        <Form.Control
                            type="date"
                            onChange={(event) =>
                                dateState[1](event.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3 form_group"
                        controlId="formBasicText"
                    >
                        <Form.Label>Kezdés időpontja</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="12:00"
                            onChange={(event) =>
                                timeState[1](event.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 form_group">
                        <Form.Label>Terem</Form.Label>
                        <Form.Select
                            onChange={(event) => {
                                roomState[1](event.target.value);
                                console.log(event.target.value);
                            }}
                        >
                            {rooms?.map((room, index) => (
                                <option key={index} value={room.id}>
                                    {room.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="to_center">
                        <Button
                            className="mybutton"
                            variant="primary"
                            onClick={(event) => {
                                event.preventDefault();
                                ExamsService.create(
                                    dateState[0],
                                    timeState[0],
                                    roomState[0],
                                    subjectID,
                                )
                                    .then((_) => {
                                        window.location.href = `/exams?subjectID=${subjectID}`;
                                    })
                                    .catch((e) =>
                                        handleError(e, errorState[1]),
                                    );
                            }}
                        >
                            Felvétel
                        </Button>
                    </div>
                    <Errors errors={errorState[0]}></Errors>
                </Form>
            </div>
        </main>
    );
}
