"use client";

import { Errors } from "@/common/errors";
import { getEmail } from "@/common/header";
import {
    Course as CourseModel,
    courseInterval,
    dayOfWeekToString,
} from "@/common/models/course";
import { Subject } from "@/common/models/subject";
import { CoursesService } from "@/common/services/courses.service";
import { handleError } from "@/common/utils";
import { useState } from "react";
import { Button } from "react-bootstrap";

export interface CourseProps {
    course: CourseModel;
}

export function Course({ course }: CourseProps) {
    const [errors, setErrors] = useState<string[]>([]);
    return (
        <div className="border_course flex_container_course">
            <div className="flex_child_course main_white_color">
                <p>
                    {course?.teachers
                        ?.map((t) => t.familyname + " " + t.forename)
                        .join(", ")}
                </p>
            </div>
            <div className="flex_child_course main_white_color">
                <p>{course.room.name}</p>
            </div>
            <div className="flex_child_course main_white_color">
                <p>
                    {dayOfWeekToString(course.dayOfWeek)}{" "}
                    {courseInterval(course)}
                </p>
            </div>
            <div className="flex_child_course main_white_color">
                <p>
                    Férőhely: {course.students.length} / {course.room.size}
                </p>
            </div>
            <div className="flex_child_course main_white_color">
                {course?.students.find((s) => s.email === getEmail()) ? (
                    <Button
                        variant="danger"
                        onClick={(event) => {
                            event.preventDefault();
                            CoursesService.leave(course.id)
                                .then(
                                    () => (window.location.href = "/subjects"),
                                )
                                .catch((e) => handleError(e, setErrors));
                        }}
                    >
                        Lead
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        disabled={course.room.size <= course.students.length}
                        onClick={(event) => {
                            event.preventDefault();
                            CoursesService.join(course.id)
                                .then(
                                    () => (window.location.href = "/subjects"),
                                )
                                .catch((e) => handleError(e, setErrors));
                        }}
                    >
                        Felvesz
                    </Button>
                )}
                <Errors errors={errors}></Errors>
            </div>
        </div>
    );
}
