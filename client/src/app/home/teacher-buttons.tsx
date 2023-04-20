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
}: TeacherButtonsProps) {
    return (
        <div className="flex_child">
            {giveMark !== false ? (
                <Button variant="primary">Jegy beírása</Button>
            ) : (
                <></>
            )}{" "}
            {createExam !== false ? (
                <Button href="/teacher/exams" variant="primary">
                    Vizsga kiírása
                </Button>
            ) : (
                <></>
            )}{" "}
            {statistics !== false ? (
                <Button variant="primary">Statisztika</Button>
            ) : (
                <></>
            )}{" "}
        </div>
    );
}
