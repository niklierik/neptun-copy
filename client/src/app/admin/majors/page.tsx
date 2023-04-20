"use client";

import Header from "@/common/header";
import { Form, Button } from "react-bootstrap";
import { MajorsTable } from "../datas/majors/majors-table";
import MajorsData from "../datas/majors/page";

export default function Majors() {

    return <main>

        <Header></Header>

        <div className="to_center border_3px">
            <Form className="format">
                <Form.Group className="mb-3 form_group" controlId="formBasicText">
                    <Form.Label>Szak neve</Form.Label>
                    <Form.Control type="text" placeholder="Név" />

                </Form.Group>

                <Form.Group className="mb-3 form_group">
                    <Form.Label>Szak rövidítése</Form.Label>
                    <Form.Control type="text" placeholder="Rövidítés" />
                </Form.Group>

                <div className="to_center">
                    <Button className="mybutton" variant="primary" type="submit">
                        Felvétel
                    </Button>
                </div>
            </Form>
        </div>

        <div>
            <MajorsTable></MajorsTable>
        </div>

    </main>
}