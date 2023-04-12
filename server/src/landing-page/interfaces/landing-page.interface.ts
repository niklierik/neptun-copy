import { Course, Semester } from "src/courses/entities/course.entity";
import { Subject } from "src/subjects/entities/subject.entity";

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
