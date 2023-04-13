import { Course } from "src/courses/entities/course.entity";
import { Exam } from "src/exams/entities/exam.entity";
import { Major } from "src/majors/entities/majors.entity";
import { Mark } from "src/marks/entities/mark.entity";
import { Message } from "src/messaging/entities/message.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

@Entity("users", {
  name: "users",
  schema: "SYSTEM",
})
export class User {
  @PrimaryColumn({ type: String })
  email: string;

  @Column({ type: String, nullable: true, select: false })
  password: string;

  @Column({ type: String })
  familyname: string;

  @Column({ type: String })
  forename: string;

  @Column({ type: String })
  address: string;

  @Column({ type: Date })
  birthdate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: Boolean, default: false, select: false })
  isValid: boolean;

  @Column({ type: Boolean, default: false })
  isAdmin: boolean;

  @Column({ type: String, nullable: true, select: false })
  validationToken?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => Major, (major) => major.users, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: "major", referencedColumnName: "majorID" })
  major?: Major;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Exam, (exam) => exam.examinees, {
    eager: true,
  })
  exams: Exam[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Message, (msg) => msg.from, {
    eager: true,
  })
  sentMessages: Message;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Message, (msg) => msg.to, {
    eager: true,
  })
  receivedMessages: Message;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Course, (course) => course.students, {
    eager: true,
  })
  courses: Course[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Course, (course) => course.teachers, {
    eager: true,
  })
  teaching: Course[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Mark, (mark) => mark.user, {
    eager: true,
  })
  marks: Mark[];
}
