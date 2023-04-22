import { Course } from "src/courses/entities/course.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("news")
export class News {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("clob")
  content: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Course, (course) => course.news, {
    onDelete: "CASCADE",
    eager: false,
  })
  course: Course;

  @CreateDateColumn()
  createdAt: Date;
}
