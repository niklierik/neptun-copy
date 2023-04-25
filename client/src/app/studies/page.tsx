"use client";

import Header from "@/common/header";
import { StudiesService } from "@/common/services/studies.service";
import { asyncTask } from "@/common/utils/async-task";
import { Semester } from "./semester";
import { Year } from "@/common/models/studies";
import * as _ from "lodash";

export default function Studies() {
    const { html, data: studies } = asyncTask("get-studies", () =>
        StudiesService.get(),
    );
    if (html) {
        return html;
    }
    if (!studies) {
        return <></>;
    }
    const entries = Object.entries(studies);
    const semestersJsx = entries.map(([year, _semesters], index) => {
        if (year === "avg") {
            return <></>;
        }
        const semesters = _semesters as Year;
        return (
            <div key={index}>
                <Semester
                    marks={semesters["1"]}
                    year={year}
                    semester={1}
                ></Semester>
                <Semester
                    marks={semesters["0"]}
                    year={year}
                    semester={0}
                ></Semester>
            </div>
        );
    });
    return (
        <main>
            <Header></Header>

            <h2 style={{ marginBottom: "60px" }} className="main_white_color">
                Súlyozott tanulmányi átlag: {_.round(studies.avg ?? 0, 2)}
            </h2>
            {semestersJsx}
        </main>
    );
}
