"use client";

import { Exam } from "@/common/models/exam";
import { format } from "date-fns";

export interface ExamInfoDataProps {
    exam: Exam;
}

export function ExamInfoData({ exam }: ExamInfoDataProps) {
    return (
        <div className="flex_container_exam">
            <div className="flex_child_exam main_white_color">
                <p>{exam.subject.name}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>
                    {exam.subject.courses
                        ?.map((course) =>
                            course.teachers.map(
                                (t) =>
                                    `${t.familyname} ${t.forename} (${t.email})`,
                            ),
                        )
                        ?.flat()
                        .map((teacher, i) => (
                            <p key={i}>{teacher}</p>
                        ))}
                </p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>{format(new Date(exam.when), "yyyy / MM / dd HH:mm:ss")}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>{exam.room.name}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>
                    {exam.examinees.length}/{exam.room.size}
                </p>
            </div>
        </div>
    );
}
