"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Course, dayOfWeekToString, Semester } from "@/common/models/course";
import { EducationChart, RequirementTypeToString } from "@/common/models/education-chart";
import { Forum } from "@/common/models/forum";
import { Major } from "@/common/models/major";
import { Message } from "@/common/models/message";
import { Room } from "@/common/models/room";
import { Subject, SubjectType, subjectTypeToString } from "@/common/models/subject";
import { User } from "@/common/models/user";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from 'swr';



async function loadForum() {
    const res = await axios.get<Forum[]>(getServerUrl("forums/courses"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function ForumData() {

    const { data, error, isLoading } = useSWR(getServerUrl("forums/courses"), loadForum, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const [errors, setErrors] = useState([] as string[]);
    const [forums, setForums] = useState([] as Forum[]);
    useEffect(() => {
        if (data && data.length) {
            setForums(data ?? []);
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
        "Feladó",
        "Tartalom",
        "Kurzus",
        "Létrehozás dátuma",
    ];

    const rows = forums?.map((f) => [
        f.id,
        f.sender.email,
        f.message,
        f.course.subject.name + " (" + subjectTypeToString(f.course.subject.type) + ") | " + dayOfWeekToString(f.course.dayOfWeek) + " " + f.course.startAt + ":00",
        format(new Date(f.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    return <main>

        <Header></Header>

        <DataTable header={header} rows={rows ?? []}></DataTable>

    </main>
}



