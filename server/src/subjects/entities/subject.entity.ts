import { Course } from "src/courses/entities/course.entity";
import { EducationChart } from "src/education-charts/education-chart.entity";
import { CommonForumMsg } from "src/forums/entities/common-forum-msg.entity";
import { CommonNews } from "src/news/entities/common-news.entity";
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
  @OneToMany((_type) => Course, (course) => course.subject, {
    onDelete: "CASCADE",
    eager: false,
  })
  courses: Course[];

  @Column()
  credit: number;

  @Column()
  hoursAWeek: number;

  @Column("number")
  type: SubjectType;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => CommonForumMsg, (forum) => forum.subject, {
    onDelete: "CASCADE",
    eager: true,
  })
  forum: CommonForumMsg[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => CommonNews, (news) => news.subject, {
    onDelete: "CASCADE",
    eager: true,
  })
  news: CommonNews[];

  @CreateDateColumn()
  createdAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => EducationChart, (educhart) => educhart.subject, {
    eager: false,
    onDelete: "CASCADE",
  })
  educhart: EducationChart[];
}
