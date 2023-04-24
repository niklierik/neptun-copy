"use client";
import Header from "@/common/header";
import { ExamInfoHeader } from "./exam-info-header";
import { ExamsService } from "@/common/services/exams.service";
import { asyncTask } from "@/common/utils/async-task";
import { ExamInfoData } from "./exam-info-data";
import { Button } from "react-bootstrap";

export interface ExamInfoProps {
    examID?: string;
}

export function ExamInfo({ examID }: ExamInfoProps) {
    const { html, data: exam } = asyncTask("get-exam", () =>
        ExamsService.get(examID),
    );
    if (html) {
        return html;
    }
    if (!exam) {
        return <></>;
    }

    return (
        <main>
            <Header></Header>

            <ExamInfoHeader></ExamInfoHeader>
            <ExamInfoData exam={exam}></ExamInfoData>

            <div style={{ marginTop: "60px" }} className="form_group m-2">
                <h3>Vizsgázók</h3>
                <div>
                    {exam.examinees.map((u, index) => (
                        <div key={index} className="m-2">
                            <Button
                                href={`/pms?with=${u.email}`}
                            >{`${u.familyname} ${u.forename} (${u.email})`}</Button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
