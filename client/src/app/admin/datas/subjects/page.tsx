"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Course, dayOfWeekToString, Semester } from "@/common/models/course";
import { Major } from "@/common/models/major";
import { Room } from "@/common/models/room";
import { Subject, SubjectType } from "@/common/models/subject";
import { User } from "@/common/models/user";
import { SubjectsService } from "@/common/services/subjects.service";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import { asyncTask } from "@/common/utils/async-task";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from 'swr';




export default function SubjectData() {

    const { data: subjects, html } = asyncTask(getServerUrl("subjects"), SubjectsService.getAllSubjects);
    if (html) {
        return html;
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



