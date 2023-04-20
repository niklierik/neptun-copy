"use client";

import { getServerUrl } from "@/common/cfg";
import Header from "@/common/header";
import { asyncTask } from "@/common/utils/async-task";
import WriteMark from "./write-mark";
import { CoursesService } from "@/common/services/courses.service";
import { Course } from "@/common/models/course";
import { MarksService } from "@/common/services/marks.service";
import { Mark } from "@/common/models/mark";

export interface MarksProps {
    searchParams: { courseID: string };
}

export default function Marks(props: MarksProps) {
    const { courseID } = props.searchParams;
    const { data: course, html: html1 } = asyncTask<Course>(getServerUrl("courses"), async () => CoursesService.getCourse(courseID));
    const { data: marks, html: html2 } = asyncTask<Mark[]>(getServerUrl("marks"), async () => MarksService.getMarks(courseID));
    if (html1) {
        return html1;
    }
    if (html2) {
        return html2;
    }
    return (
        <main>
            <Header></Header>
            <div className="to_center">
                <div className="flex_container main_white_color border_2px">
                    <div className="flex_child">
                        <p>ABC-567</p>
                    </div>
                    <div className="flex_child">
                        <p>Programozási nyelvek</p>
                    </div>
                    <div className="flex_child">
                        <p>IR-217-3 - Irinyi 217 PC-terem (IR-217-3)</p>
                    </div>
                    <div className="flex_child">
                        <p>Hétfő 18:00-20:00</p>
                    </div>
                    <div className="flex_child">
                        <p>Gyakorlat</p>
                    </div>
                </div>
            </div>
            <div>
                {
                    course?.students?.map((s, index) => (
                        <WriteMark key={index} email={s.email} name={`${s.familyname} ${s.forename}`} mark={marks?.find(m => m?.user?.email === s?.email)?.mark ?? 0}></WriteMark>
                    ))
                }
            </div>
        </main>
    );
}
