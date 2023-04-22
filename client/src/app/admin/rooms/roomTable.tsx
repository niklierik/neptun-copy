"use client";

import { Room } from "@/common/models/room";
import { Button, Form, Table } from "react-bootstrap";
import { EditRoom } from "./edit-room";

export default function RoomTable({ rooms }: { rooms?: Room[] }) {
    rooms ??= [];
    const header = ["Terem neve", "Terem kapacitása", "Terem törlése"];
    return (
        <div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {header.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, index) => (
                        <EditRoom key={index} room={room}></EditRoom>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
