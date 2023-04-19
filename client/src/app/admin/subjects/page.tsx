"use client";

import Header from "@/common/header";
import { Subject, SubjectType, subjectTypeToString } from "@/common/models/subject";
import { Button, Form } from "react-bootstrap";
import SubjectTable from "./subjectTable";

const subjects: Partial<Subject>[] = [
    {
        name: "Programozási nyelvek",
        credit: 2,
        hoursAWeek: 2,
        type: SubjectType.PRACTICE
    }
];

export default function Subjects() {

    return <main>

        <Header></Header>

        <div className="to_center border_3px">
            <Form className="format">
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Tantárgy neve</Form.Label>
                    <Form.Control type="text" placeholder="Tantárgy neve" />
                </Form.Group>
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Kredit</Form.Label>
                    <Form.Control type="text" placeholder="Kredit" />
                </Form.Group>
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Heti óraszám</Form.Label>
                    <Form.Control type="text" placeholder="Heti óraszám" />
                </Form.Group>
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Típus</Form.Label>
                    <Form.Control type="text" placeholder="Tantárgy típusa" />
                </Form.Group>
                <div className="to_center">
                    <Button className="mybutton" variant="primary" type="submit">
                        Tantárgy felvétele
                    </Button>
                </div>
            </Form>
        </div>

        <div>
            <SubjectTable subjects={subjects}></SubjectTable>
        </div>

    </main>
}