import { Room } from "src/rooms/room.entity";
import { Subject } from "src/subjects/subject.entity";
import { User } from "src/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("exams")
export class Exam {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  when: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Subject, { eager: true })
  subject: Subject;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Room, { eager: true })
  room: Room;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => User, (user) => user.exams, { eager: false })
  @JoinTable()
  examinees: User[];

  @CreateDateColumn()
  createdAt: Date;
}
