import { Course } from "@/common/models/course";
import { Subject } from "@/common/models/subject";
import { Button } from "react-bootstrap";

export interface StudentButtonsProps {
    course?: Course;
    subject?: Subject;
    teacher: boolean;
}

export function StudentButtons({
    course,
    subject,
    teacher,
}: StudentButtonsProps) {
    return (
        <div className="flex_child">
            <Button
                variant="primary"
                href={`/messaging?subjectID=${subject?.id ?? ""}&courseID=${
                    course?.id ?? ""
                }`}
            >
                Fórum
            </Button>{" "}
            <Button
                variant="primary"
                href={`/messaging?teacher=${teacher}&news=true&subjectID=${
                    subject?.id ?? ""
                }&courseID=${course?.id ?? ""}`}
            >
                Hirdetmények
            </Button>{" "}
        </div>
    );
}
