import axios from "axios";
import { getServerUrl } from "../cfg";
import { Course } from "../models/course";
import { getAuthToken } from "../utils";

export class CoursesService {
    static async getCourses() {
        const res = await axios.get<Course[]>(getServerUrl("courses"), {
            headers: { Authorization: getAuthToken() },
        });

        return res.data;
    }

    static async getCourse(id: string) {
        const res = await axios.get<Course>(getServerUrl("courses"), {
            headers: { Authorization: getAuthToken() },
        });
    }
}
