"use client";

import Header from "@/common/header";
import { asyncTask } from "@/common/utils/async-task";
import { SubjectsService } from "@/common/services/subjects.service";
import { Subject } from "./subject";

export default function Studies() {
    const { html, data: subjects } = asyncTask("get-subjects", () =>
        SubjectsService.getAllSubjects(),
    );
    if (html) {
        return html;
    }
    if (!subjects) {
        return <></>;
    }
    return (
        <main>
            <Header></Header>
            <div>
                {subjects.map((subject, index) => (
                    <Subject key={index} subject={subject}></Subject>
                ))}
            </div>
        </main>
    );
}
