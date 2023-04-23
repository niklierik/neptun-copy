"use client";

import axios from "axios";
import { getServerUrl } from "../cfg";
import { Mark } from "../models/mark";
import { User } from "../models/user";
import { getAuthToken } from "../utils";

export class MarksService {
    static async getMarks(course: string): Promise<Mark[]> {
        const res = await axios.get<Mark[]>(getServerUrl(`marks/${course}`), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }

    static async createMark(
        course: string,
        mark: number,
        target: string | User,
    ) {
        if (typeof target === "object") {
            target = target.email;
        }
        return axios.post(
            getServerUrl("marks"),
            {
                mark,
                course,
                target,
            },
            { headers: { Authorization: getAuthToken() } },
        );
    }

    static async stats(course?: string, subject?: string) {
        if (course) {
            const res = await axios.get<Record<string, number>>(
                getServerUrl("marks/stats/course/" + course),
                {
                    headers: { Authorization: getAuthToken() },
                },
            );
            return res.data;
        }
        if (subject) {
            const res = await axios.get<Record<string, number>>(
                getServerUrl("marks/stats/subject/" + subject),
                {
                    headers: { Authorization: getAuthToken() },
                },
            );
            return res.data;
        }
        const res = await axios.get<Record<string, number>>(
            getServerUrl("marks/stats"),
            {
                headers: { Authorization: getAuthToken() },
            },
        );
        return res.data;
    }
}
