import { getServerUrl } from "@/common/cfg";
import { MessagesService } from "@/common/services/messages.service";
import { asyncTask } from "@/common/utils/async-task";
import { Message } from "./message";
import { User } from "@/common/models/user";
import { getEmail } from "@/common/header";
import { useEffect, useState } from "react";
import { Message as MessageModel } from "@/common/models/message";

export interface ListMessagesProps {
    who?: Partial<User> | undefined;
}

export function dropMessagesBoxDown() {
    const objDiv = document.getElementById("messages-list");
    if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}

export function ListMessages({ who }: ListMessagesProps) {
    const [messages, setMessages] = useState<MessageModel[]>([]);
    useEffect(() => {
        MessagesService.of(who?.email)
            .then((res) => {
                setMessages(res ?? []);
            })
            .catch();
    }, [who]);

    useEffect(dropMessagesBoxDown, [messages]);
    return (
        <div id="messages-list" className="messages-list">
            {messages?.map((message, index) => (
                <Message
                    key={index}
                    you={message.from.email === getEmail()}
                    message={message.message}
                    other=""
                    time={message.createdAt}
                ></Message>
            ))}
        </div>
    );
}
