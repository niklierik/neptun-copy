import { Semester } from "./course";
import { Subject } from "./subject";
import { User } from "./user";

export interface Mark {
  id: string;
  user: User;
  subject: Subject;
  mark: number;
  year: number;
  semester: Semester;
}