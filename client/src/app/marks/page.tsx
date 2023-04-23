"use client";
import Header from "@/common/header";
import { MarksTable } from "@/common/marks-table/marks-table";

export default function Marks() {
    return (
        <main>
            <Header></Header>
            <MarksTable counter={0}></MarksTable>
        </main>
    );
}
