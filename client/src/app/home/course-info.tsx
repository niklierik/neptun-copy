import { Course } from "@/common/models/course";
import { Button } from "react-bootstrap";
import { TeacherButtons } from "./teacher-buttons";
import { StudentButtons } from "./student-buttons";

export interface CourseInfoProps {
    course: Course;
}

export function CourseInfo({ course }: CourseInfoProps) {
    return (
        <div className="flex_container bottom_border mb-2">
            <div className="flex_child main_white_color margin_left">
                <p>Adott tárgy gyakorlat</p>
            </div>
            <StudentButtons></StudentButtons>
            <TeacherButtons giveMark={false}></TeacherButtons>
        </div>
    );
}
