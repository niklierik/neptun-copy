"use client";

import { semesterToString } from "@/common/models/course";
import { Mark } from "@/common/models/mark";
import * as _ from "lodash";
import { Semester as SemesterEnum } from "@/common/models/course";
import { SemesterHeader } from "./main-header";
import { subjectTypeToString } from "@/common/models/subject";

export interface SemesterProps {
    marks: Mark[];
    year: string;
    semester: SemesterEnum;
}

export function Semester({ marks, year, semester }: SemesterProps) {
    if (marks == null || marks.length == 0) {
        return <></>;
    }
    const weightedMark = _.sum(marks.map((s) => s.mark * s.subject.credit));
    const weights = _.sum(marks.map((s) => s.subject.credit));
    let avg = weightedMark / weights;
    avg = _.round(avg, 2);
    return (
        <div>
            <h2 style={{ marginBottom: "20px" }} className="main_white_color">
                {year} {semesterToString(semester)} (Félévi átlag: {avg})
            </h2>
            <SemesterHeader></SemesterHeader>
            {marks.map((mark, index) => (
                <div
                    className="flex_container_studies main_white_color"
                    key={index}
                >
                    <div className="flex_child_studies">
                        <p>
                            {mark.subject.name} (
                            {subjectTypeToString(mark.subject.type)})
                        </p>
                    </div>
                    <div className="flex_child_studies">
                        <p>{mark.subject.credit}</p>
                    </div>
                    <div className="flex_child_studies">
                        <p>{mark.mark}</p>
                    </div>
                </div>
            ))}
        </div>
    );
    /*
    return (
        <div
            style={{ background: "#2185d5", borderBottom: "3px solid #f3f3f3" }}
            className="flex_container_studies"
        >
            <div className="flex_child_studies form_group">
                <p>Második félév</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Kredit</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Kredit</p>
            </div>
            <div className="flex_child_studies form_group">
                <p>Átlag</p>
            </div>
        </div>
    );*/
}
