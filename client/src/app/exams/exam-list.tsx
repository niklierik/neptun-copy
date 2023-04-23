"use client";
import Header from "@/common/header";
import { ExamsService } from "@/common/services/exams.service";
import { asyncTask } from "@/common/utils/async-task";
import { ExamListHeader } from "./exam-list-header";
import { ExamListExams } from "./exam-list-exams";

export function ExamList() {
    const { html, data: exams } = asyncTask("get-exams", () =>
        ExamsService.list(),
    );
    if (html) {
        return html;
    }
    return (
        <main>
            <Header></Header>

            <ExamListHeader></ExamListHeader>
            <ExamListExams exam={exams}></ExamListExams>
        </main>
    );
}
