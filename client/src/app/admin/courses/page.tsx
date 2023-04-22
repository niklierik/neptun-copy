"use client";

import Header from "@/common/header";
import CourseTable from "./course-table";
import { CreateCourseForm } from "./create-course-form";
import { useState } from "react";

export interface CoursesProps {
    searchParams: {
        subjectID?: string;
    };
}

export default function Courses(props: CoursesProps) {
    const [subject, setSubject] = useState<string | undefined>(
        props.searchParams.subjectID,
    );
    return (
        <main>
            <Header></Header>

            <CreateCourseForm
                subject={subject}
                setSubject={setSubject}
            ></CreateCourseForm>

            <div>
                <CourseTable subjectID={subject}></CourseTable>
            </div>
        </main>
    );
}
