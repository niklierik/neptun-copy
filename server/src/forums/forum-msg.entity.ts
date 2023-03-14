import { Course } from "src/courses/course.entity";
import { User } from "src/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

@Entity("forum")
export class ForumMsg {
  @PrimaryColumn()
  id: number;

  @Column()
  sender: User;

  @Column("clob")
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Course, (course) => course.forum, { eager: false })
  @PrimaryColumn()
  course: Course;
}
