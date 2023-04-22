import { Room } from "./room";
import { Subject } from "./subject";
import { User } from "./user";

export interface Exam {
    id: string;

    when: Date;

    subject: Subject;

    room: Room;

    examinees: User[];

    createdAt: Date;
}
