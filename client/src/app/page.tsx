"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { LandingPageService } from "@/common/services/landing-page.service";
import { asyncTask } from "@/common/utils/async-task";
import { SemesterInfo } from "./home/semester-info";
import { UserStats } from "./home/user-stats";

export default function Home() {
    const { html, data } = asyncTask(
        getServerUrl("landing-page"),
        LandingPageService.get,
    );
    if (html) {
        return html;
    }
    if (data == null) {
        return <></>;
    }
    return (
        <main>
            <Header></Header>
            <UserStats></UserStats>
            <div>
                {data.semesters.map((semester, index) => (
                    <SemesterInfo
                        key={index}
                        semester={semester}
                    ></SemesterInfo>
                ))}
            </div>
        </main>
    );
}
