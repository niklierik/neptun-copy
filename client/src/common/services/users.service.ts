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
        const res = await axios.get<User[]>(getServerUrl("users"), {
            headers: { Authorization: getAuthToken() },
            params: { email, name },
        });
        return res.data;
    }
}
