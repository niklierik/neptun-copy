"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { CommonForum } from "@/common/models/common-forum";
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



async function loadCommonForum() {
    const res = await axios.get<CommonForum[]>(getServerUrl("forums/subjects"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function CommonForumData() {

    const { data, error, isLoading } = useSWR(getServerUrl("forums/subjects"), loadCommonForum, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const [errors, setErrors] = useState([] as string[]);
    const [commonForums, setCommonForums] = useState([] as CommonForum[]);
    useEffect(() => {
        if (data && data.length) {
            setCommonForums(data ?? []);
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
        "Tantárgy",
        "Létrehozás dátuma",
    ];

    const rows = commonForums?.map((cf) => [
        cf.id,
        cf.sender.email,
        cf.message,
        cf.subject.name + " (" + subjectTypeToString(cf.subject.type) + ")",
        format(new Date(cf.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    return <main>

        <Header></Header>

        <DataTable header={header} rows={rows ?? []}></DataTable>

    </main>
}



