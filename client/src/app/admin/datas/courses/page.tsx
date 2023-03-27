"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Course, dayOfWeekToString, Semester } from "@/common/models/course";
import { Major } from "@/common/models/major";
import { SubjectType } from "@/common/models/subject";
import { User } from "@/common/models/user";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from 'swr';



async function loadCourse() {
    const res = await axios.get<Course[]>(getServerUrl("courses"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function CoursesData() {

    const { data, error, isLoading } = useSWR(getServerUrl("courses"), loadCourse, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const [errors, setErrors] = useState([] as string[]);
    const [courses, setCourses] = useState([] as Course[]);
    useEffect(() => {
        if (data && data.length) {
            setCourses(data ?? []);
        }
        if (error) {
            handleError(error, setErrors);
        }
    }, [data, error]);
    if (errors.length > 0) {
        return <main><Header></Header><div className="error_div">{errors.map((e, id) => (<p key={id}>{e}</p>))}</div></main>;
    }
    if (isLoading) {
        return <main><Header></Header><p className="white_text">Loading...</p></main >;
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
        `${course.year}  ${course.semester == Semester.FALL ? "Ősz" : "Tavasz"}`,
        format(new Date(course.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    return <main>

        <Header></Header>

        <DataTable header={header} rows={rows ?? []}></DataTable>

    </main>
}



