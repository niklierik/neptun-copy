"use client";

import { Errors } from "@/common/errors";
import {
    Course,
    DayOfWeek,
    dayOfWeekToString,
    semesterToString,
} from "@/common/models/course";
import { subjectTypeToString } from "@/common/models/subject";
import { CoursesService } from "@/common/services/courses.service";
import { RoomsService } from "@/common/services/rooms.service";
import { handleError } from "@/common/utils";
import { asyncTask } from "@/common/utils/async-task";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function CourseRow({ course }: { course: Course }): JSX.Element {
    const subject = course?.subject;
    const { html, data: rooms } = asyncTask("get-rooms", () =>
        RoomsService.getRooms(),
    );
    const [startAt, setStartAt] = useState(course?.startAt ?? 8);
    const [day, setDay] = useState(course?.dayOfWeek ?? 1);
    const [room, setRoom] = useState(course?.room?.id);
    const [errors, setErrors] = useState<string[]>([]);
    if (html) {
        return html;
    }
    if (course == null) {
        return <></>;
    }

    const days = [];
    for (let day = DayOfWeek.MONDAY; day <= DayOfWeek.FRIDAY; day++) {
        days.push(day);
    }

    return (
        <tr>
            <td>
                {subject?.name} ({subjectTypeToString(subject?.type)})
            </td>
            <td>{course.year}</td>
            <td>{semesterToString(course?.semester)}</td>
            <td>
                <Form.Select
                    value={day}
                    onChange={(event) => setDay(Number(event.target.value))}
                >
                    {days.map((day, index) => (
                        <option key={index} value={day}>
                            {dayOfWeekToString(day)}
                        </option>
                    ))}
                </Form.Select>
            </td>
            <td>
                <Form.Control
                    value={startAt}
                    type="number"
                    onChange={(event) => setStartAt(Number(event.target.value))}
                ></Form.Control>
            </td>
            <td>
                <Form.Select
                    value={room}
                    onChange={(event) => setRoom(event.target.value)}
                >
                    <option></option>
                    {rooms?.map((room, index) => (
                        <option key={index} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </Form.Select>
            </td>
            <td>
                <div>
                    <Button
                        className="m-1"
                        variant="primary"
                        onClick={(event) => {
                            CoursesService.edit(course.id, {
                                id: course.id,
                                day,
                                start: startAt,
                                roomID: room,
                            })
                                .then(() => {
                                    window.location.href =
                                        "/admin/courses?subjectID=" +
                                        course.subject.id;
                                })
                                .catch((e) => handleError(e, setErrors));
                        }}
                    >
                        Mentés
                    </Button>
                    <Button
                        className="m-1"
                        variant="danger"
                        onClick={(event) => {
                            CoursesService.delete(course?.id)
                                .then(() => {
                                    window.location.href =
                                        "/admin/courses?subjectID=" +
                                        course.subject.id;
                                })
                                .catch((e) => handleError(e, setErrors));
                        }}
                    >
                        Törlés
                    </Button>
                </div>
                <Errors errors={errors}></Errors>
            </td>
        </tr>
    );
}
