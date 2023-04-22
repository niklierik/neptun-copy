"use client";
import { ExamsService } from "@/common/services/exams.service";
import { asyncTask } from "@/common/utils/async-task";

export function ExamList() {
    const { html, data: exams } = asyncTask("get-exams", () =>
        ExamsService.list(),
    );
    if (html) {
        return html;
    }
    return <></>;
}
