"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { LandingPageService } from "@/common/services/landing-page.service";
import { asyncTask } from "@/common/utils/async-task";
import { SemesterInfo } from "./home/semester-info";

export default function Home() {
    const { html, data } = asyncTask(
        getServerUrl("landing-page"),
        LandingPageService.get,
    );
    if (html) {
        return html;
    }
    if (data == null) {
        return (
            <main>
                <Header></Header>
                <p className="error_div">Error</p>
            </main>
        );
    }
    return (
        <main>
            <Header></Header>
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
