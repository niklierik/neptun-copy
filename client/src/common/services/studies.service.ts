import axios from "axios";
import { getServerUrl } from "../cfg";
import { getAuthToken } from "../utils";
import { Studies } from "../models/studies";

export class StudiesService {
    static async get() {
        const res = await axios.get<Studies>(getServerUrl("studies"), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }
}
