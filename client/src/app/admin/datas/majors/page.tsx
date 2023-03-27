"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Major } from "@/common/models/major";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import axios from "axios";
import { format } from "date-fns";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import useSWR from 'swr';


async function loadMajors() {
    const res = await axios.get<Major[]>(getServerUrl("majors"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function MajorsData() {
    const header = [
        "ID",
        "Szak megnevezése",
        "Létrehozás dátuma",
    ];

    const { data, error, isLoading } = useSWR(getServerUrl("majors"), loadMajors);
    const [errors, setErrors] = useState([] as string[]);

    const [major, setMajors] = useState([] as Major[]);
    useEffect(() => {
        if (data && data.length) {
            setMajors(data ?? []);
        }
        if (error) {
            handleError(error, setErrors);
        }
    }, [data, error]);

    if (error) {
        handleError(error, setErrors);
        return <main><Header></Header><div className="error_div">{errors.map((e, id) => (<p key={id}>{e}</p>))}</div></main>;
    }
    if (isLoading) {
        return <main><Header></Header><p className="white_text">Loading...</p></main >;
    }

    const rows = major?.map((major, id) => [
        major.majorID,
        major.displayName,
        format(new Date(major.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    console.log(rows);

    return <main>

        <Header></Header>

        <DataTable header={header} rows={rows ?? []}></DataTable>

    </main>
}