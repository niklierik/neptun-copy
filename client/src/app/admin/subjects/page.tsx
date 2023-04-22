"use client";

import Header from "@/common/header";
import SubjectTable from "./subjectTable";
import { CreateSubjectForm } from "./create-subject-form";

export default function Subjects() {
    return (
        <main>
            <Header></Header>

            <div className="to_center border_3px">
                <CreateSubjectForm></CreateSubjectForm>
            </div>

            <div>
                <SubjectTable></SubjectTable>
            </div>
        </main>
    );
}
