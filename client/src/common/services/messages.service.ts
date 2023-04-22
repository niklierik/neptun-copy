import axios from "axios";
import { getAuthToken } from "../utils";
import { Message } from "../models/message";
import { getServerUrl } from "../cfg";

export class MessagesService {
    static async send(other?: string, message?: string) {
        if (!other && !message) {
            return;
        }
        return axios.post(
            getServerUrl("messaging"),
            { message },
            {
                headers: { Authorization: getAuthToken() },
                params: {
                    to: other,
                },
            },
        );
    }
    static async of(other?: string) {
        console.log(other);
        if (!other) {
            return [];
        }
        const res = await axios.get<Message[]>(getServerUrl("messaging"), {
            headers: { Authorization: getAuthToken() },
            params: {
                u1: other,
            },
        });
        return res.data;
    }

    static async social(
        subject: string | undefined,
        course: string | undefined,
        news: boolean | undefined,
    ) {
        subject = subject || undefined;
        course = course || undefined;
        if ((subject == null) == (course == null)) {
            throw new Error(
                `Subject (${subject}) and course (${course}) cannot be set at the same time. One must be provided.`,
            );
        }
        const root = news ? "news" : "forums";
        let url = root;
        if (subject) {
            url += "/subjects/" + subject;
        }
        if (course) {
            url += "/courses/" + course;
        }
        const res = await axios.get(getServerUrl(url), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }

    static async socialSend(
        subject: string | undefined,
        course: string | undefined,
        news: boolean | undefined,
        message: string | undefined,
    ) {
        subject = subject || undefined;
        course = course || undefined;
        if ((subject == null) == (course == null)) {
            throw new Error(
                `Subject (${subject}) and course (${course}) cannot be set at the same time. One must be provided.`,
            );
        }
        const root = news ? "news" : "forums";
        let url = root;
        if (subject) {
            url += "/subjects/" + subject;
        }
        if (course) {
            url += "/courses/" + course;
        }
        const res = await axios.post(
            getServerUrl(url),
            {
                message,
            },
            {
                headers: { Authorization: getAuthToken() },
            },
        );
        return res.data;
    }
}
