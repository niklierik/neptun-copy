"use client";
import axios from "axios";
import { getServerUrl } from "../cfg";
import { Course, DayOfWeek, Semester } from "../models/course";
import { getAuthToken } from "../utils";

export class CoursesService {
    static async create(
        subjectID: string,
        roomID: string,
        year: number,
        semester: Semester,
        day: DayOfWeek,
        start: number,
    ) {
        if (
            !subjectID ||
            !roomID ||
            year < 2023 ||
            semester == null ||
            day == null ||
            start == null
        ) {
            return;
        }
        return axios.post(
            getServerUrl("courses"),
            {
                subjectID,
                year,
                day,
                semester,
                roomID,
                start,
            },
            { headers: { Authorization: getAuthToken() } },
        );
    }
    static async getCourses() {
        const res = await axios.get<Course[]>(getServerUrl("courses"), {
            headers: { Authorization: getAuthToken() },
        });

        return res.data;
    }

    static async getCourse(id: string) {
        const res = await axios.get<Course>(getServerUrl(`courses/${id}`), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }
    static async edit(id: string, data: any) {
        return axios.patch(getServerUrl("courses/edit"), data, {
            headers: { Authorization: getAuthToken() },
        });
    }
    static async delete(id: string) {
        return axios.delete(getServerUrl("courses/" + id), {
            headers: { Authorization: getAuthToken() },
        });
    }
}
