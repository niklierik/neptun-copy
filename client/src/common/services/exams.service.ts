import axios from "axios";
import { getServerUrl } from "../cfg";
import { getAuthToken } from "../utils";
import { Exam } from "../models/exam";

export class ExamsService {
    static async create(
        date: string,
        time: string,
        room: string,
        subject: string,
    ) {
        time = "T" + time.replace(" ", "");
        const datetime = new Date(date + time);
        const res = await axios.post<Exam>(
            getServerUrl("exams"),
            {
                when: datetime,
                room,
                subject,
            },
            { headers: { Authorization: getAuthToken() } },
        );
        return res.data;
    }

    static async getOf(subjectID: string | undefined) {
        if (subjectID) {
            return [];
        }
        const res = await axios.get<Exam[]>(
            getServerUrl("exams/of/" + subjectID),
            {
                headers: { Authorization: getAuthToken() },
            },
        );
        return res.data;
    }

    static async join(examID?: string) {
        if (!examID) {
            throw "No Exam ID.";
        }
        const res = await axios.patch<Exam>(
            getServerUrl("exams/" + examID),
            {},
            {
                headers: { Authorization: getAuthToken() },
            },
        );
        return res.data;
    }

    static async leave(id: string) {
        if (!id) {
            throw "No exam ID.";
        }
        const res = await axios.delete(getServerUrl("exams/leave/" + id), {
            headers: { Authorization: getAuthToken() },
        });
        return res;
    }

    static async delete(id: string) {
        if (!id) {
            throw "No exam ID.";
        }
        const res = await axios.delete(getServerUrl("exams/" + id), {
            headers: { Authorization: getAuthToken() },
        });
        return res;
    }

    static async get(examID?: string) {
        if (!examID) {
            return undefined;
        }
        const res = await axios.get<Exam>(getServerUrl("exams/" + examID), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }

    static async list() {
        const res = await axios.get<Exam[]>(getServerUrl("exams"), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }
}
