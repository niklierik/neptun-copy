"use client"

import { Course } from "./course";
import { User } from "./user";

export interface Forum {
    id: string;
    sender: User;
    message: string;
    createdAt: Date;
    course: Course;
}