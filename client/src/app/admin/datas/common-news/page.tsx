"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { CommonForum } from "@/common/models/common-forum";
import { CommonNew } from "@/common/models/common-new";
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



async function loadCommonNew() {
    const res = await axios.get<CommonNew[]>(getServerUrl("news/subjects"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function CommonNewData() {

    const { data, error, isLoading } = useSWR(getServerUrl("news/subjects"), loadCommonNew, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const [errors, setErrors] = useState([] as string[]);
    const [commonNews, setCommonNews] = useState([] as CommonNew[]);
    useEffect(() => {
        if (data && data.length) {
            setCommonNews(data ?? []);
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
        "Tantárgy",
        "Létrehozás dátuma",
    ];

    const rows = commonNews?.map((cn) => [
        cn.id,
        cn.content,
        cn.subject.name + " (" + subjectTypeToString(cn.subject.type) + ")",
        format(new Date(cn.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    return <main>

        <Header></Header>

        <DataTable header={header} rows={rows ?? []}></DataTable>

    </main>
}



