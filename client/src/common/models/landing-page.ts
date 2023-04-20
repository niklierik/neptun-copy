import { Course, Semester } from "./course";
import { Subject } from "./subject";

export interface SubjectAndCourses {
    subject: Subject;
    courses: Course[];
    // Indicates that this subject has only one course therefore like lectures
    one: boolean;
    teacher: boolean;
}

export interface CoursesOfSemester {
    year: number;
    semester: Semester;
    subjects: SubjectAndCourses[];
}

export interface LandingPage {
    semesters: CoursesOfSemester[];
}
