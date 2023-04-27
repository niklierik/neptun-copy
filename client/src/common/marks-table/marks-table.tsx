import { Table } from "react-bootstrap";
import { asyncTask } from "../utils/async-task";
import { MarksService } from "../services/marks.service";
import { useState } from "react";

export interface MarksTableProps {
    course?: string;
    subject?: string;
}

export function MarksTable({ course, subject }: MarksTableProps) {
    const { html, data: marks } = asyncTask("mark-stats", () =>
        MarksService.stats(course, subject),
    );
    if (html) {
        return html;
    }
    if (!marks) {
        return <></>;
    }
    const nums = [];
    for (let num = 1; num <= 5; num++) {
        nums.push(num);
    }
    return (
        <Table striped hover bordered>
            <thead>
                <tr>
                    {nums.map((num, index) => (
                        <th key={index}>{num}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {nums.map((num, index) => (
                        <td key={index}>{marks[num.toString()] || "0"}</td>
                    ))}
                </tr>
            </tbody>
        </Table>
    );
}
