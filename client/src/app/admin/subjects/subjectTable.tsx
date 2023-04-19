"use client";

import { Subject, subjectTypeToString } from "@/common/models/subject";
import { Button, Table } from "react-bootstrap";


export default function SubjectTable({ subjects }: { subjects: Partial<Subject>[] }) {
    const header = [
        "Tantárgy neve",
        "Kredit",
        "Heti óraszám",
        "Típus",
        "Tantárgy törlése",
    ];
    return <div>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    {
                        header.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {subjects.map((subject, index) =>
                    <tr key={index}>
                        <td>{subject.name}</td>
                        <td><input value={subject.credit}></input></td>
                        <td><input value={subject.hoursAWeek}></input><Button className="margin_left" variant="primary" type="submit">Mentés</Button></td>
                        <td>{subjectTypeToString(subject.type)}</td>
                        <td><form><Button variant="danger" type="submit">Törlés</Button></form></td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div >
}