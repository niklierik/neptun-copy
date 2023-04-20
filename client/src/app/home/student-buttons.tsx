import { Course } from "@/common/models/course";
import { Subject } from "@/common/models/subject";
import { Button } from "react-bootstrap";

export interface StudentButtonsProps {
    course?: Course;
    subject?: Subject;
}

export function StudentButtons({ course, subject }: StudentButtonsProps) {
    return (
        <div className="flex_child">
            <Button
                variant="primary"
                href={`/forum?subjectID=${subject?.id}&courseID=${course?.id}`}
            >
                Fórum
            </Button>{" "}
            <Button
                variant="primary"
                href={`/news?subjectID=${subject?.id}&courseID=${course?.id}`}
            >
                Hirdetmények
            </Button>{" "}
        </div>
    );
}
