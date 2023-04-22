"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { Message } from "@/common/models/message";
import DataTable from "@/common/table";
import { getAuthToken, handleError } from "@/common/utils";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR from "swr";

async function loadMessage() {
    const res = await axios.get<Message[]>(getServerUrl("messaging"), {
        headers: { Authorization: getAuthToken() },
    });

    return res.data;
}

export default function MessageData() {
    const { data, error, isLoading } = useSWR(
        getServerUrl("messaging"),
        loadMessage,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
        },
    );
    const [errors, setErrors] = useState([] as string[]);
    const [messages, setMessages] = useState([] as Message[]);
    useEffect(() => {
        if (data && data.length) {
            setMessages(data ?? []);
        }
        if (error) {
            handleError(error, setErrors);
        }
    }, [data, error]);
    if (errors.length > 0) {
        return (
            <main>
                <Header></Header>
                <div className="error_div">
                    {errors.map((e, id) => (
                        <p key={id}>{e}</p>
                    ))}
                </div>
            </main>
        );
    }
    if (isLoading) {
        return (
            <main>
                <Header></Header>
                <p className="white_text">Loading...</p>
            </main>
        );
    }

    const header = ["ID", "Tartalom", "Feladó", "Címzett", "Létrehozás dátuma"];

    const rows = messages?.map((mes) => [
        mes.id,
        mes.message,
        mes.from.email,
        mes.to.email,
        format(new Date(mes.createdAt), "yyyy / MM / dd HH:mm:ss"),
    ]);

    return (
        <main>
            <Header></Header>

            <DataTable header={header} rows={rows ?? []}></DataTable>
        </main>
    );
}
