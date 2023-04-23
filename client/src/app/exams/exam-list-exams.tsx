"use client";

import { Exam } from "@/common/models/exam";
import { Button } from "react-bootstrap";
import { format } from "date-fns";

export interface ExamListExamsProps {
    exam: Exam;
}

export function ExamListExams({ exam }: ExamListExamsProps) {
    return (
        <div className="flex_container_exam border_exam_list">
            <div className="flex_child_exam main_white_color">
                <p>{exam.subject.name}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>{format(new Date(exam.when), "yyyy / MM / dd HH:mm:ss")}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>
                    {exam.examinees.length}/{exam.room.size}
                </p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>{exam.room.name}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <Button type="submit" variant="primary">
                    Jelentkezés
                </Button>
                <Button
                    style={{ marginLeft: "20px" }}
                    type="submit"
                    variant="secondary"
                >
                    Részletek
                </Button>
            </div>
        </div>
    );
}
