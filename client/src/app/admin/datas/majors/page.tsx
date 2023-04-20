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
import { MajorsTable } from "./majors-table";


async function loadMajors() {
    const res = await axios.get<Major[]>(getServerUrl("majors"), { headers: { Authorization: getAuthToken() } });

    return res.data;
}

export default function MajorsData() {


    return <main>

        <Header></Header>
        <MajorsTable></MajorsTable>

    </main>
}