import { SubjectAndCourses } from "@/common/models/landing-page";
import { CourseInfo } from "./course-info";
import { TeacherButtons } from "./teacher-buttons";
import { subjectTypeToString } from "@/common/models/subject";
import { StudentButtons } from "./student-buttons";

export interface SubjectInfoProps {
    subject: SubjectAndCourses;
}

export function SubjectInfo({ subject }: SubjectInfoProps) {
    if (subject.one) {
        const [course] = subject.courses;
        return (
            <div className="mb-5">
                <div className="flex_container border_1px">
                    <div className="flex_child main_white_color">
                        <p>
                            {course.subject.name} (
                            {subjectTypeToString(course.subject.type)})
                        </p>
                    </div>
                    <StudentButtons
                        course={course}
                        subject={subject.subject}
                    ></StudentButtons>
                    {subject.teacher ? (
                        <TeacherButtons></TeacherButtons>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        );
    }
    return (
        <div className="mb-5">
            <div className="flex_container border_1px">
                <div className="flex_child main_white_color">
                    <p>
                        Összevont {subject.subject.name} (
                        {subjectTypeToString(subject.subject.type)})
                    </p>
                </div>
                <StudentButtons subject={subject.subject}></StudentButtons>
                <TeacherButtons
                    subject={subject.subject}
                    createExam={false}
                    giveMark={false}
                ></TeacherButtons>
            </div>
            <div>
                {subject.courses.map((course, index) => (
                    <CourseInfo key={index} course={course}></CourseInfo>
                ))}
            </div>
        </div>
    );
}
