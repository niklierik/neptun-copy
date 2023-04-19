"use client";

import Header from "@/common/header";
import { Room } from "@/common/models/room";
import DataTable from "@/common/table";
import { Button, Form } from "react-bootstrap";
import RoomTable from "./roomTable";

const rooms: Partial<Room>[] = [
    {
        name: "Irinyi 217",
        size: 60,
    }
];

export default function Rooms() {
    return <main>

        <Header></Header>

        <div className="to_center border_3px">
            <Form className="format">
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Terem neve</Form.Label>
                    <Form.Control type="text" placeholder="Terem neve" />
                </Form.Group>
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Terem kapacitása</Form.Label>
                    <Form.Control type="text" placeholder="Terem kapacitása" />
                </Form.Group>
                <div className="to_center">
                    <Button className="mybutton" variant="primary" type="submit">
                        Terem felvétele
                    </Button>
                </div>
            </Form>
        </div>

        <div>
            <p className="to_center main_white_color">Termek szerkesztése</p>
            <RoomTable rooms={rooms}></RoomTable>
        </div>


    </main>
}