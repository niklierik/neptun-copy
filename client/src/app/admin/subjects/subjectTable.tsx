"use client";

import { Subject, subjectTypeToString } from "@/common/models/subject";
import { SubjectsService } from "@/common/services/subjects.service";
import { asyncTask } from "@/common/utils/async-task";
import { Button, Table } from "react-bootstrap";
import { EditSubjectRow } from "./edit-subject-row";

export default function SubjectTable() {
    const { html, data: subjects } = asyncTask("get-subjects", () =>
        SubjectsService.getAllSubjects(),
    );
    if (html) {
        return html;
    }
    const header = [
        "Tantárgy neve",
        "Kredit",
        "Heti óraszám",
        "Tantárgy törlése",
    ];
    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {header.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {subjects?.map((subject, index) => (
                        <EditSubjectRow
                            key={index}
                            subject={subject}
                        ></EditSubjectRow>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
