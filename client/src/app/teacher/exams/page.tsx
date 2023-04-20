"use client";

import Header from "@/common/header";
import { Button, Form } from "react-bootstrap";


export default function Exams() {

    return <main>

        <Header></Header>

        <div className="main_white_color to_center">
            <p style={{ fontWeight: "bold", fontSize: 20 }}>Tantárgy neve</p>
        </div>

        <div className="to_center">
            <Form className="format">

                <Form.Group className="mb-3 form_group">
                    <Form.Label>Dátum</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>

                <Form.Group className="mb-3 form_group" controlId="formBasicText">
                    <Form.Label>Kezdés időpontja</Form.Label>
                    <Form.Control type="text" placeholder="12:00" />

                </Form.Group>

                <Form.Group className="mb-3 form_group">
                    <Form.Label>Terem</Form.Label>
                    <Form.Select>
                        <option>Irinyi 217</option>
                    </Form.Select>
                </Form.Group>

                <div className="to_center">
                    <Button className="mybutton" variant="primary" type="submit">
                        Felvétel
                    </Button>
                </div>
            </Form>
        </div>

    </main>
}