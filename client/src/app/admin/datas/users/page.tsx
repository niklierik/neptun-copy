"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Major } from "@/common/models/major";
import { User } from "@/common/models/user";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from 'swr';



async function loadUsers() {
    const res = await axios.get<User[]>(getServerUrl("users"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function UsersData() {
    const header = [
        "Email",
        "Vezetéknév",
        "Keresztnév",
        "Szak",
        "Lakcím",
        "Születési dátum",
        "Létrehozás dátuma",
        "Admin",
        "Valid",
    ];
    const { data, error, isLoading } = useSWR(getServerUrl("users"), loadUsers, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
    });
    const [errors, setErrors] = useState([] as string[]);
    const [users, setUsers] = useState([] as User[]);
    useEffect(() => {
        if (data && data.length) {
            setUsers(data ?? []);
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

    const rows = users?.map((user) => [
        user.email,
        user.familyname,
        user.forename,

        `${user.major?.displayName}  (${user.major?.majorID})`,

        user.address,
        format(new Date(user.birthdate), "YYYY / MM / DD"),
        format(new Date(user.createdAt), "YYYY / MM / DD HH:mm:ss"),
        user.isAdmin ? "Igen" : "Nem",
        user.isValid ? "Igen" : "Nem",
    ]);

    return <main>

        <Header></Header>

        <DataTable header={header} rows={rows ?? []}></DataTable>

    </main>
}


