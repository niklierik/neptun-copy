"use client";
import Header from "@/common/header";
import { ExamInfoHeader } from "./exam-info-header";
import { ExamsService } from "@/common/services/exams.service";
import { asyncTask } from "@/common/utils/async-task";
import { ExamInfoData } from "./exam-info-data";
import { format } from "date-fns";

export interface ExamInfoProps {
    examID?: string;
}

export function nameEmail(person: {
    email: string;
    familyname: string;
    forename: string;
}) {
    return [person.familyname, person.forename, person.email].join(" ");
}

export function ExamInfo({ examID }: ExamInfoProps) {
    const { html, data: exam } = asyncTask("get-exam", () =>
        ExamsService.get(examID),
    );
    if (html) {
        return html;
    }

    return (
        <main>
            <Header></Header>

            <ExamInfoHeader></ExamInfoHeader>
            <ExamInfoData
                subjectName={exam?.subject?.name ?? ""}
                teacherName="asd"
                date={exam?.when || new Date()}
                roomName={exam?.room?.name || ""}
                examineesNumber={exam?.examinees?.length || 0}
                size={exam?.room.size || 0}
            ></ExamInfoData>

            <div style={{ marginTop: "60px" }} className="form_group">
                <p>Vizsgázók</p>
            </div>
            <div>{exam?.examinees.map(nameEmail)}</div>
        </main>
    );
}
