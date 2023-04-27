import { Errors } from "@/common/errors";
import { MarksService } from "@/common/services/marks.service";
import { handleError } from "@/common/utils";
import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";

export interface WriteMarkProps {
    name: string;
    email: string;
    mark: number;
    loading: boolean;
    setLoading: (_: boolean) => void;
    course: string;
}

export function onChange(
    event: ChangeEvent<HTMLSelectElement>,
    setLoading: (_: boolean) => void,
    course: string,
    target: string,
    setErrors: (_: string[]) => void,
) {
    const mark = Number(event.target.value);
    console.log(event);
    setLoading(true);
    MarksService.createMark(course, mark, target)
        .then()
        .catch((e) => handleError(e, setErrors))
        .finally(() => {
            setLoading(false);
            window.location.href = "/teacher/marks?courseID=" + course;
        });
}

export default function WriteMark({
    name,
    email,
    mark,
    course,
    loading,
    setLoading,
}: WriteMarkProps) {
    const [errors, setErrors] = useState<string[]>([]);
    const marks = [];
    for (let i = 1; i <= 5; i++) {
        marks.push(i);
    }
    return errors.length > 0 ? (
        <div className="flex_container main_white_color bottom_border">
            <Errors errors={errors}></Errors>
        </div>
    ) : (
        <div className="to_center">
            <div className="flex_container main_white_color bottom_border">
                <div className="flex_child">
                    <p>
                        {name} ({email})
                    </p>
                </div>
                <div className="flex_child">
                    <p>Érdemjegy:</p>
                </div>
                <div className="flex_child">
                    <form>
                        <Form.Select
                            size="sm"
                            onChange={(event) =>
                                onChange(
                                    event,
                                    setLoading,
                                    course,
                                    email,
                                    setErrors,
                                )
                            }
                            value={mark?.toString() || ""}
                            disabled={loading}
                        >
                            {!mark ? <option value="">Jegy</option> : <></>}
                            {marks.map((m, index) => (
                                <option
                                    key={index}
                                    value={m}
                                    disabled={loading}
                                >
                                    {m}
                                </option>
                            ))}
                        </Form.Select>
                    </form>
                </div>
            </div>
        </div>
    );
}
