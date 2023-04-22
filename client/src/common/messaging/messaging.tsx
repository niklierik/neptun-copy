"use client";

import { useEffect, useState } from "react";
import { Message } from "./message";
import { WriteMessageForm } from "./write-message-form";
import { User } from "../models/user";
import { MessagesService } from "../services/messages.service";
import { handleError } from "../utils";
import { Errors } from "../errors";

export interface MessagingProps {
    subjectID?: string;
    courseID?: string;
    news?: boolean;
    teacher?: boolean;
}

export interface MessageModel {
    createdAt: Date;
    content: string;
    from?: User;
    subject?: string;
    course?: string;
}

function toModel(model: any): MessageModel {
    return {
        createdAt: model.createdAt,
        content: model.content ?? model.message,
        course: model.course?.id,
        subject: model.subject?.id,
        from: model.sender,
    };
}

export function Messaging({
    subjectID,
    courseID,
    news,
    teacher,
}: MessagingProps) {
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    useEffect(() => {
        MessagesService.social(subjectID, courseID, news)
            .then((res) => setMessages(res.map(toModel)))
            .catch((err) => handleError(err, setErrors));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const messagesHtml = (
        <div>
            {messages.map((message, index) => (
                <Message message={message} key={index}></Message>
            ))}
        </div>
    );
    return (
        <div>
            {!news || teacher ? (
                <WriteMessageForm
                    subjectID={subjectID}
                    courseID={courseID}
                    news={Boolean(news)}
                    teacher={Boolean(teacher)}
                ></WriteMessageForm>
            ) : (
                <></>
            )}
            {errors?.length ? <Errors errors={errors}></Errors> : messagesHtml}
        </div>
    );
}
