"use client";
import { ExamsService } from "@/common/services/exams.service";
import { asyncTask } from "@/common/utils/async-task";
import { ExamInfo } from "./exam-info";
import { ExamList } from "./exam-list";

export interface ExamsProps {
    searchParams: {
        examID?: string;
    };
}

export default function Exams({ searchParams }: ExamsProps): JSX.Element {
    const { examID } = searchParams;
    const { html, data: exam } = asyncTask("get-exams", () =>
        ExamsService.get(examID),
    );
    if (html) {
        return html;
    }
    if (exam) {
        // Page when an exam is selected
        return <ExamInfo exam={exam}></ExamInfo>;
    }
    // List exams
    return <ExamList></ExamList>;
}
