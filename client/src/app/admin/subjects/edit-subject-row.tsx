import { Errors } from "@/common/errors";
import { Subject, subjectTypeToString } from "@/common/models/subject";
import { SubjectsService } from "@/common/services/subjects.service";
import { handleError } from "@/common/utils";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export interface EditSubjectRowProps {
    subject: Subject;
}

export function EditSubjectRow({ subject }: EditSubjectRowProps) {
    const [credit, setCredit] = useState(subject.credit);
    const [hoursAWeek, setHoursAWeek] = useState(subject.hoursAWeek);
    const [err, setErr] = useState<string[]>([]);
    return (
        <tr>
            <td>
                {subject.name} ({subjectTypeToString(subject.type)})
            </td>
            <td>
                <Form.Control
                    type="number"
                    value={credit}
                    onChange={(event) => setCredit(Number(event.target.value))}
                ></Form.Control>
            </td>
            <td>
                <Form.Control
                    type="number"
                    value={hoursAWeek}
                    onChange={(event) =>
                        setHoursAWeek(Number(event.target.value))
                    }
                ></Form.Control>
            </td>
            <td>
                <Button
                    className="m-1"
                    variant="primary"
                    onClick={(event) => {
                        event.preventDefault();
                        SubjectsService.edit({
                            id: subject.id,
                            credit,
                            hoursAWeek,
                        })
                            .then(
                                () =>
                                    (window.location.href = "/admin/subjects"),
                            )
                            .catch((e) => handleError(e, setErr));
                    }}
                >
                    Mentés
                </Button>
                <Button
                    className="m-1"
                    variant="danger"
                    onClick={(event) => {
                        event.preventDefault();
                        SubjectsService.delete(subject.id)
                            .then(
                                () =>
                                    (window.location.href = "/admin/subjects"),
                            )
                            .catch((e) => handleError(e, setErr));
                    }}
                >
                    Törlés
                </Button>
                <Errors errors={err}></Errors>
            </td>
        </tr>
    );
}
