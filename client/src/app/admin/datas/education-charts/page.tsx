"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Course, dayOfWeekToString, Semester } from "@/common/models/course";
import { EducationChart, RequirementTypeToString } from "@/common/models/education-chart";
import { Major } from "@/common/models/major";
import { Room } from "@/common/models/room";
import { Subject, SubjectType, subjectTypeToString } from "@/common/models/subject";
import { User } from "@/common/models/user";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from 'swr';



async function loadSubject() {
    const res = await axios.get<EducationChart[]>(getServerUrl("education-charts"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function EducationChartData() {

    const { data, error, isLoading } = useSWR(getServerUrl("education-charts"), loadSubject, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const [errors, setErrors] = useState([] as string[]);
    const [educationCharts, setEducationCharts] = useState([] as EducationChart[]);
    useEffect(() => {
        if (data && data.length) {
            setEducationCharts(data ?? []);
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
        "Szak",
        "Ajánlott félév",
        "Kötelezettség típusa",
        "Létrehozás dátuma",
    ];

    const rows = educationCharts?.map((edu) => [
        edu.id,
        edu.subject.name + " (" + subjectTypeToString(edu.subject.type) + ")",
        edu.major.displayName,
        edu.recommendedSemester + "",
        RequirementTypeToString(edu.requirementType),
        format(new Date(edu.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    return <main>

        <Header></Header>

        <DataTable header={header} rows={rows ?? []}></DataTable>

    </main>
}



