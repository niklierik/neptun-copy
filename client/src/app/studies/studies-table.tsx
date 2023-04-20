"use client";

import { Room } from "@/common/models/room";
import { Button, Table } from "react-bootstrap";

export default function StudiesTable({ studies }: { studies: Partial<Studies>[] }) {
    const header = [
        "Terem neve",
        "Terem kapacitása",
        "Terem törlése",
    ];
    return <div>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    {
                        header.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {rooms.map((room, index) =>
                    <tr key={index}>
                        <td>{room.name}</td>
                        <td><form><input value={room.size}></input><Button className="margin_left" variant="primary" type="submit">Mentés</Button></form></td>
                        <td><form><Button variant="danger" type="submit">Törlés</Button></form></td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div >
}