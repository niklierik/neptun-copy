"use client";

import { format } from "date-fns";
import { Card } from "react-bootstrap";

export interface MessagesProps {
    you: boolean;
    message: string;
    other: string;
    time: Date;
}

export function Message({ you, message, time }: MessagesProps) {
    return (
        <div className={you ? "right_mail" : "left_mail"}>
            <Card
                style={{ width: "18rem" }}
                bg={you ? "primary" : undefined}
                text={you ? "white" : undefined}
            >
                <Card.Subtitle style={{ margin: "0px 5px" }}>
                    <br></br>
                    {format(
                        new Date(time ?? "2023-01-01T12:12:12"),
                        "yyyy / MM / dd HH:mm:ss",
                    )}
                </Card.Subtitle>
                <Card.Body style={{ margin: "0px 0px" }}>
                    <Card.Text style={{ margin: "0px 0px" }}>
                        {message}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
