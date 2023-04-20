"use client";

import Header from "@/common/header";
import { Room } from "@/common/models/room";
import StudiesTable from "./studies-table";

export default function Studies() {

    const rooms: Partial<Room>[] = [
        {
            name: "Irinyi 217",
            size: 60,
        }
    ];

    return <main>
        <Header></Header>

        <div>
            <StudiesTable rooms={rooms}></StudiesTable>
        </div>
    </main>
}