"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { CommonForum } from "@/common/models/common-forum";
import { Course, dayOfWeekToString, Semester } from "@/common/models/course";
import { EducationChart, RequirementTypeToString } from "@/common/models/education-chart";
import { Forum } from "@/common/models/forum";
import { Major } from "@/common/models/major";
import { Message } from "@/common/models/message";
import { New } from "@/common/models/new";
import { Room } from "@/common/models/room";
import { Subject, SubjectType, subjectTypeToString } from "@/common/models/subject";
import { User } from "@/common/models/user";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from 'swr';



async function loadNew() {
    const res = await axios.get<New[]>(getServerUrl("news/courses"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function NewData() {

    const { data, error, isLoading } = useSWR(getServerUrl("news/courses"), loadNew, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const [errors, setErrors] = useState([] as string[]);
    const [news, setNews] = useState([] as New[]);
    useEffect(() => {
        if (data && data.length) {
            setNews(data ?? []);
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
        "Tartalom",
        "Kurzus",
        "Létrehozás dátuma",
    ];

    const rows = news?.map((n) => [
        n.id,
        n.content,
        n.course.subject.name + " (" + subjectTypeToString(n.course.subject.type) + ") | " + dayOfWeekToString(n.course.dayOfWeek) + " " + n.course.startAt + ":00",
        format(new Date(n.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    return <main>

        <Header></Header>

        <DataTable header={header} rows={rows ?? []}></DataTable>

    </main>
}



