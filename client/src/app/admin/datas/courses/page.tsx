"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Course, dayOfWeekToString, Semester } from "@/common/models/course";
import { Major } from "@/common/models/major";
import { SubjectType } from "@/common/models/subject";
import { User } from "@/common/models/user";
import { CoursesService } from "@/common/services/courses.service";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import { asyncTask } from "@/common/utils/async-task";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function CoursesData() {
    const { data: courses, html } = asyncTask(
        getServerUrl("courses"),
        CoursesService.getCourses,
    );
    if (html) {
        return html;
    }
    const header = [
        "ID",
        "Tantárgy neve",
        "Tantárgy típusa",
        "Terem",
        "Időpont",
        "Félév",
        "Létrehozás dátuma",
    ];

    const rows = courses?.map((course) => [
        course.id,
        course.subject.name,
        course.subject.type == SubjectType.LECTURE ? "Előadás" : "Gyakorlat",
        course.room.name,
        `${dayOfWeekToString(course.dayOfWeek)}  ${course.startAt}:00`,
        `${course.year}  ${
            course.semester == Semester.FALL ? "Ősz" : "Tavasz"
        }`,
        format(new Date(course.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    return (
        <main>
            <Header></Header>

            <DataTable header={header} rows={rows ?? []}></DataTable>
        </main>
    );
}
