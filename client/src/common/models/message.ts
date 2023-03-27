"use client"

import { User } from "./user";

export interface Message {
    id: string;
    message: string;
    from: User;
    to: User;
    createdAt: Date;
}