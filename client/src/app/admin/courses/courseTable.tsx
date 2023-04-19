"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Course } from "@/common/models/course";
import { Subject } from "@/common/models/subject";
import { SubjectsService } from "@/common/services/subjects.service";
import { handleError } from "@/common/utils";
import { asyncTask } from "@/common/utils/async-task";
import { DeepPartial } from "@/common/utils/deep-partial";
import { useState, useEffect } from "react";

import { Button, Table } from "react-bootstrap";
import useSWR from 'swr';
import { courseRow } from "./courseRow";

export default function CourseTable({ courses }: { courses: DeepPartial<Course>[] }) {

    const { data: subjects, html } = asyncTask(getServerUrl("subjects"), SubjectsService.getAllSubjects);
    if (html) {
        return html;
    }


    const header = [
        "Tantárgy neve",
        "Év",
        "Nap",
        "Kezdés időpontja",
        "Szemeszter",
        "Terem",
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
                {courses.map((course, index) =>
                    courseRow(course, index, subjects ?? [])
                )}
            </tbody>
        </Table>
    </div >
}
