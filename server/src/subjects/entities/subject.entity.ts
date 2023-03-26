import { Course } from "src/courses/course.entity";
import { CommonForumMsg } from "src/forums/common-forum-msg.entity";
import { CommonNews } from "src/news/common-news.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SubjectType } from "./subject-type.enum";

@Entity("subjects", {
  name: "subjects",
})
export class Subject {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Course, (course) => course.subject, { eager: false })
  courses: Course[];

  @Column()
  credit: number;

  @Column()
  hoursAWeek: number;

  @Column("number")
  type: SubjectType;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => CommonForumMsg, (forum) => forum.subject, {
    eager: true,
  })
  forum: CommonForumMsg[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => CommonNews, (news) => news.subject, { eager: true })
  news: CommonNews[];

  @CreateDateColumn()
  createdAt: Date;
}
