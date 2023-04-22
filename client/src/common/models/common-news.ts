"use client";

import { Subject } from "./subject";

export interface CommonNews {
    id: string;
    content: string;
    subject: Subject;
    createdAt: Date;
}
