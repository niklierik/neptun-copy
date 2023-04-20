"use client";

import { Card } from "react-bootstrap";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

export interface MessageProps {
    name: string;
    email: string;
    text: string;
    time: string;
}

export function Message({ name, email, time, text }: MessageProps) {
    return (
        <div style={{ marginBottom: "20px" }} className="center_news">
            <Card>
                <Card.Body>
                    <Card.Title>
                        {name} ({email})
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        {format(
                            new Date(time ?? "2023-01-01T12:12:12"),
                            "yyyy / MM / dd HH:mm:ss",
                        )}
                    </Card.Subtitle>
                    <Card.Text>{text}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
