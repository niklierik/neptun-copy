"use client"

import { Subject } from "./subject";
import { User } from "./user";

export interface CommonForum {
    id: string;
    sender: User;
    message: string;
    createdAt: Date;
    subject: Subject;
}