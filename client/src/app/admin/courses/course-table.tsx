"use client";

import { SubjectsService } from "@/common/services/subjects.service";

import { Table } from "react-bootstrap";
import CourseRow from "./course-row";
import { useEffect, useState } from "react";
import { handleError } from "@/common/utils";
import { Subject } from "@/common/models/subject";
import { Errors } from "@/common/errors";

export interface CourseTableProps {
    subjectID?: string;
}

export default function CourseTable({ subjectID }: CourseTableProps) {
    const [errors, setErrs] = useState<string[]>([]);
    const [subject, setSubject] = useState<Subject>();
    useEffect(() => {
        SubjectsService.getSubject(subjectID)
            .then((res) => setSubject(res))
            .catch((e) => handleError(e, setErrs));
    }, [subjectID]);

    const header = [
        "Tantárgy neve",
        "Év",
        "Szemeszter",
        "Nap",
        "Kezdés időpontja",
        "Terem",
        "Tantárgy műveletek",
    ];
    return (
        <div>
            <Errors errors={errors}></Errors>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {header.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {subject?.courses?.map((course, index) => (
                        <CourseRow course={course} key={index}></CourseRow>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
