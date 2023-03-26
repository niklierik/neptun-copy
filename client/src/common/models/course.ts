import { Room } from "./room";
import { Subject } from "./subject";
import { User } from "./user";

export enum Semester {
    FALL = 0,
    SPRING = 1,
}

export enum DayOfWeek {
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
}

export function dayOfWeekToString(day: DayOfWeek) {
    switch (day) {
        case DayOfWeek.MONDAY:
            return "Hétfő";
    }
}

export interface Course {
    id: string;
    startAt: number;
    dayOfWeek: DayOfWeek;
    year: number;
    semester: Semester;
    createdAt: string;
    teachers: User[];
    room: Room;
    subject: Subject;


}