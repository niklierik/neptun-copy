import { Course } from "@/common/models/course";
import { Subject } from "@/common/models/subject";
import { Button } from "react-bootstrap";

export interface TeacherButtonsProps {
    giveMark?: boolean;
    createExam?: boolean;
    statistics?: boolean;
    course?: Course;
    subject?: Subject;
}

export function TeacherButtons({
    giveMark,
    createExam,
    statistics,
    course,
    subject,
}: TeacherButtonsProps) {
    return (
        <div className="flex_child">
            {giveMark !== false ? (
                <Button
                    href={`/teacher/marks?courseID=${
                        course?.id ?? subject?.id
                    }`}
                    variant="primary"
                >
                    Jegy beírása
                </Button>
            ) : (
                <></>
            )}{" "}
            {createExam !== false ? (
                <Button
                    href={`/teacher/exams?subjectID=${subject?.id}`}
                    variant="primary"
                >
                    Vizsga kiírása
                </Button>
            ) : (
                <></>
            )}{" "}
            {statistics !== false ? (
                <Button
                    href={`/teacher/statistics?subjectID=${subject?.id}&courseID=${course?.id}`}
                    variant="primary"
                >
                    Statisztika
                </Button>
            ) : (
                <></>
            )}{" "}
        </div>
    );
}
