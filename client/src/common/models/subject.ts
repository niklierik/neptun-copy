import { Course } from "./course";

export enum SubjectType {
    LECTURE = 0,
    PRACTICE = 1,
}

export interface Subject {
    id: string;
    name: string;
    credit: number;
    hoursAWeek: number;
    type: SubjectType;
    createdAt: string;
    courses?: Course[];
}

export function subjectTypeToString(sub?: SubjectType) {
    switch (sub) {
        case SubjectType.LECTURE:
            return "Előadás";
        case SubjectType.PRACTICE:
            return "Gyakorlat";
    }
    return "";
}
