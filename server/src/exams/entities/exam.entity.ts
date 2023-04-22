import { Room } from "src/rooms/room.entity";
import { Subject } from "src/subjects/entities/subject.entity";
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
  @ManyToOne((type) => Subject, {
    onDelete: "CASCADE",
    eager: true,
  })
  subject: Subject;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Room, {
    onDelete: "CASCADE",
    eager: true,
  })
  room: Room;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => User, (user) => user.exams, {
    eager: false,
    cascade: ["insert", "update"],
    onDelete: "CASCADE",
  })
  @JoinTable()
  examinees: User[];

  @CreateDateColumn()
  createdAt: Date;
}
