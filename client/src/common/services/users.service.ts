"use client";

import axios from "axios";
import { getServerUrl } from "../cfg";
import { getAuthToken } from "../utils";
import { User } from "../models/user";

export class UsersService {
    static async get(email: string): Promise<User | undefined> {
        const res = await axios.get<User>(getServerUrl(`users/${email}`), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }
    static async getUsers(email?: string, name?: string) {
        const res = await axios.get<User[]>(
            getServerUrl(`users?email=${email ?? ""}&name=${name ?? ""}`),
            {
                headers: { Authorization: getAuthToken() },
            },
        );
        return res.data;
    }

    /**
     * @param mode students | teachers | both | every
     */
    static async count(mode?: "students" | "teachers" | "both" | "every") {
        mode ??= "every";
        const res = await axios.get(getServerUrl(`count?mode=${mode}`), {
            headers: { Authorization: getAuthToken() },
        });
        return res;
    }

    static async changePwd(
        oldPassword: string,
        newPassword: string,
        newPasswordAgain: string,
    ) {
        const res = await axios.post(
            getServerUrl("users/changePassword"),
            { oldPassword, newPassword, newPasswordAgain },
            { headers: { Authorization: getAuthToken() } },
        );
        return res;
    }

    static async changePwdByToken(
        token: string,
        newPassword: string,
        newPasswordAgain: string,
    ) {
        const res = await axios.post(
            getServerUrl("users/changePwdByToken?token=" + token),
            { newPassword, newPasswordAgain },
            { headers: { Authorization: getAuthToken() } },
        );
        return res;
    }

    static async unregister() {
        return axios.delete(getServerUrl("users"), {
            headers: { Authorization: getAuthToken() },
        });
    }

    static async requestToken(email: string) {
        return axios.put(getServerUrl("users/newToken/" + email));
    }
}
