"use client"

import { Course } from "./course";

export interface New {
    id: string;
    content: string;
    course: Course;
    createdAt: Date;
}