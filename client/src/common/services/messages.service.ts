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
}
