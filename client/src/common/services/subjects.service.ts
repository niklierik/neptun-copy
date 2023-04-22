"use client";

import axios from "axios";
import { getServerUrl } from "../cfg";
import { Subject } from "../models/subject";
import { getAuthToken } from "../utils";

export class SubjectsService {
    static async getSubject(subjectID?: string) {
        if (!subjectID) {
            return;
        }
        const res = await axios.get<Subject>(
            getServerUrl("subjects/" + subjectID),
            {
                headers: { Authorization: getAuthToken() },
            },
        );
        return res.data;
    }
    static async getAllSubjects() {
        const res = await axios.get<Subject[]>(getServerUrl("subjects"), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }
}
