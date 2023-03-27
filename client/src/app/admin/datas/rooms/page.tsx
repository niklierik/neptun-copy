"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Course, dayOfWeekToString, Semester } from "@/common/models/course";
import { Major } from "@/common/models/major";
import { Room } from "@/common/models/room";
import { SubjectType } from "@/common/models/subject";
import { User } from "@/common/models/user";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from 'swr';



async function loadRoom() {
    const res = await axios.get<Room[]>(getServerUrl("rooms"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function RoomsData() {

    const { data, error, isLoading } = useSWR(getServerUrl("rooms"), loadRoom, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const [errors, setErrors] = useState([] as string[]);
    const [rooms, setRooms] = useState([] as Room[]);
    useEffect(() => {
        if (data && data.length) {
            setRooms(data ?? []);
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
        "Terem neve",
        "Terem kapacitása",
        "Létrehozás dátuma",
    ];

    const rows = rooms?.map((room) => [
        room.id,
        room.name,
        room.size + " fő",
        format(new Date(room.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    return <main>

        <Header></Header>

        <DataTable header={header} rows={rows ?? []}></DataTable>

    </main>
}



