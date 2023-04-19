"use client"

import Header from "@/common/header"
import { Course, Semester } from "@/common/models/course";
import { DeepPartial } from "@/common/utils/deep-partial";
import { Button, Form } from "react-bootstrap"
import CourseTable from "./courseTable";

const courses: DeepPartial<Course>[] = [
    {
        year: 2023,
        dayOfWeek: 1,
        startAt: 18,
        semester: Semester.SPRING,
        subject: {
            id: "3fdeddb6-0031-41c1-b848-c067c873bd66"
        }
    }
];

export default function Courses() {

    return <main>

        <Header></Header>

        <div className="to_center border_3px">
            <Form className="format">
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Tantárgy neve</Form.Label>
                    <Form.Select>
                        <option>Tantárgy neve</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Év</Form.Label>
                    <Form.Control type="text" defaultValue={"2023"} />
                </Form.Group>
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Nap</Form.Label>
                    <Form.Select>
                        <option>Hétfő</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Kezdés időpontja</Form.Label>
                    <Form.Control type="text" placeholder="Kezdés időpontja" />
                </Form.Group>
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Szemeszter</Form.Label>
                    <Form.Select>
                        <option>Tavasz</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form_group mb-3" controlId="formBasicText">
                    <Form.Label>Terem</Form.Label>
                    <Form.Select>
                        <option>Irinyi 217</option>
                    </Form.Select>
                </Form.Group>
                <div className="to_center">
                    <Button className="mybutton" variant="primary" type="submit">
                        Kurzus felvétele
                    </Button>
                </div>
            </Form>
        </div>

        <div>
            <CourseTable courses={courses}></CourseTable>
        </div>

    </main>

}