"use client";

import Header from "@/common/header";
import { StudiesService } from "@/common/services/studies.service";
import { asyncTask } from "@/common/utils/async-task";
import { MainHeader } from "./main-header";
import { Semester } from "./semester";
import { StudiesListHeader } from "./studies-list-header";
import { StudiesList } from "./studies-list";

export default function Studies() {
    const { html, data: studies } = asyncTask("get-studies", () =>
        StudiesService.get(),
    );
    if (html) {
        return html;
    }
    return (
        <main>
            <Header></Header>
            <p style={{ color: "white" }}>{JSON.stringify(studies)}</p>

            <MainHeader></MainHeader>
            <Semester></Semester>
            <StudiesListHeader></StudiesListHeader>
            <StudiesList></StudiesList>
        </main>
    );
}
