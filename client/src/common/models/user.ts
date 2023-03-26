import { Major } from "./major";

export interface User {
    email: string;
    familyname: string;
    forename: string;
    address: string;
    birthdate: string;
    createdAt: string;
    isValid: boolean;
    isAdmin: boolean;
    major?: Major;
}