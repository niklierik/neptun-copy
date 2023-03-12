import { Course } from "src/courses/course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
}
