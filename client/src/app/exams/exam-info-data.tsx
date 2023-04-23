"use client";

import { Exam } from "@/common/models/exam";
import { format } from "date-fns";

export interface ExamInfoDataProps {
    subjectName: string;
    teacherName: string;
    date: Date;
    roomName: string;
    examineesNumber: number;
    size: number;
}

export function ExamInfoData({
    subjectName,
    teacherName,
    date,
    roomName,
    examineesNumber,
    size,
}: ExamInfoDataProps) {
    return (
        <div className="flex_container_exam">
            <div className="flex_child_exam main_white_color">
                <p>{subjectName}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>{teacherName}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>{}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>{roomName}</p>
            </div>
            <div className="flex_child_exam main_white_color">
                <p>
                    {examineesNumber}/{size}
                </p>
            </div>
        </div>
    );
}
