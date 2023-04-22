"use client";

import { Card } from "react-bootstrap";
import { format } from "date-fns";
import { MessageModel } from "./messaging";

export interface MessageProps {
    message: MessageModel;
}

export function Message({ message }: MessageProps) {
    return (
        <div style={{ marginBottom: "20px" }} className="center_news">
            <Card>
                <Card.Body>
                    {message.from ? (
                        <Card.Title>
                            {`${message.from?.familyname} ${message.from?.forename}`}{" "}
                            ({message.from?.email})
                        </Card.Title>
                    ) : (
                        <></>
                    )}
                    <Card.Subtitle className="mb-2 text-muted">
                        {format(
                            new Date(message.createdAt),
                            "yyyy / MM / dd HH:mm:ss",
                        )}
                    </Card.Subtitle>
                    <Card.Text>{message.content}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
