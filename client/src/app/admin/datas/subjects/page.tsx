"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Course, dayOfWeekToString, Semester } from "@/common/models/course";
import { Major } from "@/common/models/major";
import { Room } from "@/common/models/room";
import { Subject, SubjectType } from "@/common/models/subject";
import { User } from "@/common/models/user";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from 'swr';



async function loadSubject() {
    const res = await axios.get<Subject[]>(getServerUrl("subjects"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function SubjectData() {

    const { data, error, isLoading } = useSWR(getServerUrl("subjects"), loadSubject, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const [errors, setErrors] = useState([] as string[]);
    const [subjects, setSubjects] = useState([] as Subject[]);
    useEffect(() => {
        if (data && data.length) {
            setSubjects(data ?? []);
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
        "Kredit",
        "Heti óraszám",
        "Típusa",
        "Létrehozás dátuma",
    ];

    const rows = subjects?.map((subject) => [
        subject.id,
        subject.name,
        subject.credit + "",
        subject.hoursAWeek + "",
        subject.type == SubjectType.LECTURE ? "Előadás" : "Gyakorlat",
        format(new Date(subject.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    return <main>

        <Header></Header>

        <DataTable header={header} rows={rows ?? []}></DataTable>

    </main>
}



