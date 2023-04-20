import { semesterToString } from "@/common/models/course";
import { CoursesOfSemester } from "@/common/models/landing-page";
import { Button } from "react-bootstrap";
import { CourseInfo } from "./course-info";
import { SubjectInfo } from "./subject-info";

export interface SemesterInfoProps {
    semester: CoursesOfSemester;
}

export function SemesterInfo({ semester }: SemesterInfoProps) {
    return (
        <div className="semester-info">
            <div className="to_center border_2px main_white_color">
                <h3>
                    {semester?.year} {semesterToString(semester?.semester)}
                </h3>
            </div>
            {semester.subjects.map((subject, index) => (
                <SubjectInfo subject={subject} key={index}></SubjectInfo>
            ))}
        </div>
    );
}
