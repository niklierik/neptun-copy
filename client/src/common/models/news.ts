"use client";

import { Course } from "./course";

export interface News {
    id: string;
    content: string;
    course: Course;
    createdAt: Date;
}
