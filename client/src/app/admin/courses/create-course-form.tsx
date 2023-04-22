"use client";
import { Errors } from "@/common/errors";
import {
    DayOfWeek,
    Semester,
    dayOfWeekToString,
    semesterToString,
} from "@/common/models/course";
import { subjectTypeToString } from "@/common/models/subject";
import { CoursesService } from "@/common/services/courses.service";
import { RoomsService } from "@/common/services/rooms-service";
import { SubjectsService } from "@/common/services/subjects.service";
import { asyncTask } from "@/common/utils/async-task";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
export interface CreateCourseFormProps {
    subject: string | undefined;
    setSubject: (_: string | undefined) => void;
}

export function CreateCourseForm({
    subject,
    setSubject,
}: CreateCourseFormProps) {
    const [errors, setErrors] = useState<string[]>([]);
    const [form, setForm] = useState<any>({
        year: 2023,
        day: 1,
        start: 8,
        semester: 1,
    });
    const { html: h1, data: subjects } = asyncTask("list-subjects", () =>
        SubjectsService.getAllSubjects(),
    );
    const { html: h2, data: rooms } = asyncTask("list-rooms", () =>
        RoomsService.getRooms(),
    );
    const days = [];
    for (let day = DayOfWeek.MONDAY; day <= DayOfWeek.FRIDAY; day++) {
        days.push(day);
    }
    const semesters = [];
    for (
        let semester = Semester.FALL;
        semester <= Semester.SPRING;
        semester++
    ) {
        semesters.push(semester);
    }
    if (h1) {
        return h1;
    }
    if (h2) {
        return h2;
    }
    return (
        <div className="to_center border_3px">
            <Form className="format">
                <Form.Group
                    className="form_group mb-3"
                    controlId="formBasicText"
                >
                    <Form.Label>Tantárgy neve</Form.Label>
                    <Form.Select
                        value={subject}
                        onChange={(event) =>
                            (window.location.href =
                                "/admin/courses?subjectID=" +
                                event.target.value)
                        }
                    >
                        <option>Tantárgyak</option>
                        {subjects?.map((subject, index) => (
                            <option value={subject.id} key={index}>
                                {subject.name}{" "}
                                {subjectTypeToString(subject.type)}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group
                    className="form_group mb-3"
                    controlId="formBasicText"
                >
                    <Form.Label>Év</Form.Label>
                    <Form.Control
                        type="number"
                        value={form.year}
                        onChange={(event) =>
                            setForm({ ...form, year: event.target.value })
                        }
                    />
                </Form.Group>
                <Form.Group
                    className="form_group mb-3"
                    controlId="formBasicText"
                >
                    <Form.Label>Szemeszter</Form.Label>
                    <Form.Select
                        value={form.semester}
                        onChange={(event) =>
                            setForm({ ...form, semester: event.target.value })
                        }
                    >
                        {semesters.map((day, index) => (
                            <option key={index} value={day}>
                                {semesterToString(day)}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group
                    className="form_group mb-3"
                    controlId="formBasicText"
                >
                    <Form.Label>Nap</Form.Label>
                    <Form.Select
                        value={form.day}
                        onChange={(event) =>
                            setForm({ ...form, day: event.target.value })
                        }
                    >
                        {days.map((day, index) => (
                            <option key={index} value={day}>
                                {dayOfWeekToString(day)}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group
                    className="form_group mb-3"
                    controlId="formBasicText"
                >
                    <Form.Label>Kezdés időpontja</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Kezdés időpontja"
                        value={form.start}
                        onChange={(event) =>
                            setForm({ ...form, start: event.target.value })
                        }
                    />
                </Form.Group>
                <Form.Group
                    className="form_group mb-3"
                    controlId="formBasicText"
                >
                    <Form.Label>Terem</Form.Label>
                    <Form.Select
                        value={form.room}
                        onChange={(event) =>
                            setForm({ ...form, room: event.target.value })
                        }
                    >
                        <option value="">Terem</option>
                        {rooms?.map((room, index) => (
                            <option key={index}>{room.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <div className="to_center">
                    <Button
                        className="mybutton"
                        variant="primary"
                        onClick={(event) => {
                            event.preventDefault();
                            CoursesService.create(
                                subject ?? "",
                                form.room,
                                form.year,
                                form.semester,
                                form.day,
                                form.start,
                            );
                        }}
                    >
                        Kurzus felvétele
                    </Button>
                </div>
                <Errors errors={errors}></Errors>
            </Form>
        </div>
    );
}
