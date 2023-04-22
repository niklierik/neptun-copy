"use client";
import axios from "axios";
import { LandingPage } from "../models/landing-page";
import { getServerUrl } from "../cfg";
import { getAuthToken } from "../utils";

export class LandingPageService {
    static async get(): Promise<LandingPage> {
        const res = await axios.get<LandingPage>(getServerUrl("landing-page"), {
            headers: { Authorization: getAuthToken() },
        });
        return res.data;
    }
}
