import { Room } from "src/rooms/room.entity";
import { Subject } from "src/subjects/subject.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("courses", {
  name: "courses",
})
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Subject, (subject) => subject.courses, { eager: true })
  @JoinColumn()
  subject: Subject;

  @Column({ type: "interval day to second" })
  start: Date;

  @Column()
  dayOfWeek: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Room, (room) => room.courses, { eager: true })
  room: Room;
}
