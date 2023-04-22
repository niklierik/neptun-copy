import axios from "axios";
import { Room } from "../models/room";
import { getServerUrl } from "../cfg";
import { getAuthToken } from "../utils";

export class RoomsService {
    static async getRooms() {
        const res = await axios.get<Room[]>(getServerUrl("rooms"), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }
}
