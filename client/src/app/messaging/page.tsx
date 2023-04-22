"use client";

import Header from "@/common/header";
import { Messaging } from "@/common/messaging/messaging";

export interface NewsProps {
    searchParams: {
        courseID?: string;
        subjectID?: string;
        news?: string;
        teacher?: string;
    };
}

export default function News({ searchParams }: NewsProps) {
    const { news, courseID, subjectID, teacher } = searchParams;
    return (
        <main>
            <Header></Header>
            <Messaging
                news={news === "true"}
                courseID={courseID}
                subjectID={subjectID}
                teacher={teacher === "true"}
            ></Messaging>
        </main>
    );
}
