import {
    Course,
    courseInterval,
    dayOfWeekToString,
} from "@/common/models/course";
import { TeacherButtons } from "./teacher-buttons";
import { StudentButtons } from "./student-buttons";
import { subjectTypeToString } from "@/common/models/subject";

export interface CourseInfoProps {
    course: Course;
    teacher: boolean;
}

export function CourseInfo({ course, teacher }: CourseInfoProps) {
    return (
        <div className="flex_container bottom_border mb-2">
            <div className="flex_child main_white_color margin_left">
                <p>
                    {course.subject.name} (
                    {subjectTypeToString(course.subject.type)}) -{" "}
                    {dayOfWeekToString(course.dayOfWeek)}{" "}
                    {courseInterval(course)}
                </p>
            </div>
            <StudentButtons course={course} teacher={teacher}></StudentButtons>
            <TeacherButtons createExam={false} course={course}></TeacherButtons>
        </div>
    );
}
