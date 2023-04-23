"use client";

import { Course } from "./course";
import { SubjectHeader } from "./subject-header";
import { Subject as SubjectModel } from "../../common/models/subject";

export interface SubjectProps {
    subject: SubjectModel;
}

export function Subject({ subject }: SubjectProps) {
    return (
        <div>
            <SubjectHeader subject={subject}></SubjectHeader>
            <div>
                {subject.courses?.map((course, index) => (
                    <Course key={index} course={course}></Course>
                ))}
            </div>
        </div>
    );
}
