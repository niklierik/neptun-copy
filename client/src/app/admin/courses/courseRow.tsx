"use client";

import { getServerUrl } from "@/common/cfg";
import { Course } from "@/common/models/course";
import { Subject } from "@/common/models/subject";
import { SubjectsService } from "@/common/services/subjects.service";
import { asyncTask } from "@/common/utils/async-task";
import { DeepPartial } from "@/common/utils/deep-partial";
import { Button } from "react-bootstrap";

export function courseRow(course: undefined | null | DeepPartial<Course>, index: number, subjects: Subject[]) {
    if (course == null) {
        return <></>;
    }

    return <tr key={index}>
        <td><select >{subjects?.map(s => <option value={s.id} selected={s.id === course?.subject?.id}>{s.name}</option>)}</select></td>
        <td>{course.year}</td>
        <td><select><option>Hétfő</option></select><Button className="margin_left" variant="primary" type="submit">Mentés</Button></td>
        <td><input value={course.startAt}></input></td>
        <td><select><option>Tavasz</option></select></td>
        <td><select><option>Irinyi 217</option></select></td>

        <td><form><Button variant="danger" type="submit">Törlés</Button></form></td>
    </tr>;


}