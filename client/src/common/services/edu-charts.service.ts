import axios from "axios";
import { getServerUrl } from "../cfg";
import { getAuthToken } from "../utils";
import { EducationChart } from "../models/education-chart";

export class EduChartService {
    static async get(subject: string) {
        const res = await axios.get<EducationChart | undefined>(
            getServerUrl("education-charts/" + subject),
            { headers: { Authorization: getAuthToken() } },
        );
        if (res.data == null) {
            return null;
        }
        return res.data;
    }

    static async getRecommendedSemester(subject: string) {
        const educhart = await this.get(subject);
        if (educhart == null) {
            return 0;
        }
        return educhart.recommendedSemester;
    }
}
