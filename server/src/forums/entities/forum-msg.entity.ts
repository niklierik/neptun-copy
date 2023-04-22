import { Course } from "src/courses/entities/course.entity";
import { User } from "src/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("forum")
export class ForumMsg {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => User, {
    onDelete: "CASCADE",
    eager: false,
  })
  sender: User;

  @Column("clob")
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Course, (course) => course.forum, {
    onDelete: "CASCADE",
    eager: false,
  })
  course: Course;
}
