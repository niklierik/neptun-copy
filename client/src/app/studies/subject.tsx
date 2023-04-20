"use client";

import { Course } from "./course";
import { SubjectHeader } from "./subject-header";

export function Subject() {
    return (
        <div>
            <SubjectHeader></SubjectHeader>
            <Course></Course>
        </div>
    );
}
