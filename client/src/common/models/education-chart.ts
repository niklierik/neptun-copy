"use client"

import { Major } from "./major";
import { Subject } from "./subject";

export enum RequirementType {
    REQIRED = 0,
    REQUIRED_CHOSEN = 1,
    CHOSEN = 2,
}

export interface EducationChart {
    id: string;
    subject: Subject;
    major: Major;
    recommendedSemester: number;
    requirementType: RequirementType;
    createdAt: Date;
}

export function RequirementTypeToString(req: RequirementType) {
    switch (req) {
        case RequirementType.REQIRED:
            return "Kötelező";
        case RequirementType.REQUIRED_CHOSEN:
            return "Kötelezően választható";
        case RequirementType.CHOSEN:
            return "Szabadon választható";
    }
}