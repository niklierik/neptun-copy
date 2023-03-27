"use client"

import { Subject } from "./subject";

export interface CommonNew {
    id: string;
    content: string;
    subject: Subject;
    createdAt: Date;
}