"use client";

import { Exam } from "@/common/models/exam";
import { Button } from "react-bootstrap";

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
                <p>{}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p></p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>{exam.room.name}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <Button type="submit" variant="primary">
                    Jelentkezés
                </Button>
            </div>
        </div>
    );
}
