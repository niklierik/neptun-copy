"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { asyncTask } from "@/common/utils/async-task";
import WriteMark from "./write-mark";
import { CoursesService } from "@/common/services/courses.service";
import {
    Course,
    courseInterval,
    dayOfWeekToString,
} from "@/common/models/course";
import { MarksService } from "@/common/services/marks.service";
import { Mark } from "@/common/models/mark";
import { subjectTypeToString } from "@/common/models/subject";
import { useState } from "react";
import { MarksTable } from "@/common/marks-table/marks-table";

export interface MarksProps {
    searchParams: { courseID: string };
}

export default function Marks(props: MarksProps) {
    const { courseID } = props.searchParams;
    const { data: course, html: html1 } = asyncTask<Course>(
        "get-every-course",
        async () => CoursesService.getCourse(courseID),
    );
    const { data: marks, html: html2 } = asyncTask<Mark[]>(
        "get-every-marks",
        async () => MarksService.getMarks(courseID),
    );
    const [loading, setLoading] = useState(false);
    if (html1) {
        return html1;
    }
    if (html2) {
        return html2;
    }
    return (
        <main>
            <Header></Header>
            <div className="to_center">
                <div className="flex_container main_white_color border_2px">
                    <div className="flex_child">
                        <p>{course?.subject.name}</p>
                    </div>
                    <div className="flex_child">
                        <p>{course?.room?.name}</p>
                    </div>
                    <div className="flex_child">
                        <p>
                            {dayOfWeekToString(course?.dayOfWeek)}{" "}
                            {courseInterval(course ?? undefined)}
                        </p>
                    </div>
                    <div className="flex_child">
                        <p>{subjectTypeToString(course?.subject?.type)}</p>
                    </div>
                </div>
            </div>
            <div>
                {course?.students?.map((s, index) => (
                    <WriteMark
                        key={index}
                        email={s.email}
                        name={`${s.familyname} ${s.forename}`}
                        mark={
                            marks?.find((m) => m?.user?.email === s?.email)
                                ?.mark ?? 0
                        }
                        loading={loading}
                        setLoading={setLoading}
                        course={courseID}
                    ></WriteMark>
                ))}
            </div>
            <MarksTable course={courseID}></MarksTable>
        </main>
    );
}
