export enum SubjectType {
    LECTURE = 0,
    PRACTICE = 1
}

export interface Subject {
    id: string;
    name: string;
    credit: number;
    hoursAWeek: number;
    type: SubjectType;
    createdAt: string;
}