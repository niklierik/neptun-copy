import { Mark } from "./mark";

export interface Year {
    0: Semester;
    1: Semester;
}

export type Semester = Mark[];

export type Studies = { [k: string]: Year } & { avg?: number };
