import { ForumMsg } from "src/forums/forum-msg.entity";
import { News } from "src/news/news.entity";
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
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum Semester {
  FALL = 0,
  SPRING = 1,
}

export enum DayOfWeek {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
}

@Entity("courses", {
  name: "courses",
})
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Subject, (subject) => subject.courses, {
    eager: true,
    cascade: ["insert", "update"],
  })
  subject: Subject;

  @Column()
  start: number;

  @Column()
  dayOfWeek: DayOfWeek;

  @Column()
  year: number;

  @Column("number")
  semester: Semester;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Room, (room) => room.courses, {
    eager: true,
  })
  room: Room;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => ForumMsg, (forum) => forum.course, {
    eager: true,
  })
  forum: ForumMsg[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => News, (news) => news.course, {
    eager: true,
  })
  news: News[];

  @CreateDateColumn()
  createdAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => User, (user) => user.courses, {
    eager: false,
    cascade: ["insert", "update"],
  })
  @JoinTable()
  students: User[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => User, (user) => user.teaching, {
    eager: false,
    cascade: ["insert", "update"],
  })
  @JoinTable()
  teachers: User[];
}
