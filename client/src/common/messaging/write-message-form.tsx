import { Form, Button } from "react-bootstrap";
import { MessagesService } from "../services/messages.service";
import { useState } from "react";
import { Errors } from "../errors";
import { handleError } from "../utils";

export interface WriteMessageFormProps {
    subjectID?: string;
    courseID?: string;
    news: boolean;
    teacher: boolean;
}

export function WriteMessageForm({
    subjectID,
    courseID,
    news,
    teacher,
}: WriteMessageFormProps) {
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    return (
        <div className="border_3px">
            <div className="center_news">
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label className="to_center main_white_color">
                            Új üzenet
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6}
                            onChange={(event) => setMessage(event.target.value)}
                            value={message}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={(event) => {
                            event.preventDefault();
                            MessagesService.socialSend(
                                subjectID,
                                courseID,
                                news,
                                message,
                            )
                                .then(() => {
                                    window.location.href = `/messaging?teacher=${teacher}&news=${news}&subjectID=${subjectID}&courseID=${courseID}`;
                                })
                                .catch((e) => handleError(e, setErrors));
                        }}
                    >
                        Elküldés
                    </Button>
                    <Errors errors={errors}></Errors>
                </Form>
            </div>
        </div>
    );
}
