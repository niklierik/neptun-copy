"use client";

import { Exam } from "@/common/models/exam";
import { Button } from "react-bootstrap";
import { format, subDays } from "date-fns";
import { getEmail } from "@/common/header";
import { ExamsService } from "@/common/services/exams.service";
import { handleError } from "@/common/utils";
import { useState } from "react";

export interface ExamListExamsProps {
    exam: Exam;
}

export function ExamListExams({ exam }: ExamListExamsProps) {
    const [errors, setErrors] = useState<string[]>([]);
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
                {exam.examinees.find((u) => u.email === getEmail()) ? (
                    <Button
                        variant="danger"
                        disabled={subDays(new Date(exam.when), 1) <= new Date()}
                        onClick={(event) => {
                            event.preventDefault();
                            ExamsService.leave(exam.id);
                            window.location.href = "/exams";
                        }}
                    >
                        Vizsga leadása
                    </Button>
                ) : (
                    <Button
                        variant="primary"
                        disabled={
                            exam.room.size <= exam.examinees.length ||
                            subDays(new Date(exam.when), 1) <= new Date()
                        }
                        onClick={(event) => {
                            event.preventDefault();
                            ExamsService.join(exam.id)
                                .then(() => {
                                    window.location.href = "/exams";
                                })
                                .catch((e) => handleError(e, setErrors));
                        }}
                    >
                        Jelentkezés
                    </Button>
                )}
                <Button
                    style={{ marginLeft: "20px" }}
                    variant="secondary"
                    href={"/exams?examID=" + exam.id}
                >
                    Részletek
                </Button>
            </div>
        </div>
    );
}
