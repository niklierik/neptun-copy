"use client";
import Header from "@/common/header";
import { ExamsService } from "@/common/services/exams.service";
import { asyncTask } from "@/common/utils/async-task";
import { ExamListHeader } from "./exam-list-header";
import { ExamListExams } from "./exam-list-exams";
import { format } from "date-fns";

export function ExamList() {
    const { html, data: exams } = asyncTask("get-all-exams", () =>
        ExamsService.list(),
    );
    if (html) {
        return html;
    }
    if (!exams) {
        return <></>;
    }
    return (
        <main>
            <Header></Header>

            <ExamListHeader></ExamListHeader>
            {exams.map((exam, index) => (
                <ExamListExams exam={exam} key={index}></ExamListExams>
            ))}
        </main>
    );
}
