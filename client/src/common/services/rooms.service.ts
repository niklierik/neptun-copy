import axios from "axios";
import { Room } from "../models/room";
import { getServerUrl } from "../cfg";
import { getAuthToken } from "../utils";

export class RoomsService {
    static async create(form: { name: string; size: number }) {
        return axios.post(getServerUrl("rooms"), form, {
            headers: { Authorization: getAuthToken() },
        });
    }

    static async getRooms() {
        const res = await axios.get<Room[]>(getServerUrl("rooms"), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }

    static async delete(id: string) {
        return axios.delete(getServerUrl("rooms/" + id), {
            headers: { Authorization: getAuthToken() },
        });
    }
    static async edit(form: { id: string; size: number }) {
        return axios.patch(getServerUrl("rooms"), form, {
            headers: {
                Authorization: getAuthToken(),
            },
        });
    }
}
