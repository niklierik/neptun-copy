"use client";
import { ExamInfo } from "./exam-info";
import { ExamList } from "./exam-list";

export interface ExamsProps {
    searchParams: {
        examID?: string;
    };
}

export default function Exams({ searchParams }: ExamsProps): JSX.Element {
    const { examID } = searchParams;

    // http://localhost:3000/exams?subjectID=834d6a1a-5c34-42dd-b5e8-5fcc2768156c
    if (examID) {
        // Page when an exam is selected
        return <ExamInfo examID={examID}></ExamInfo>;
    }
    // List exams
    return <ExamList></ExamList>;
}
