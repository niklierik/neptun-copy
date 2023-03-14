import { Exam } from "src/exams/exam.entity";
import { Major } from "src/majors/entities/majors.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

@Entity("users", {
  name: "users",
  schema: "SYSTEM",
})
export class User {
  @PrimaryColumn({ type: String })
  email: string;

  @Column({ type: String, nullable: true })
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

  @Column({ type: Boolean, default: false })
  isValid: boolean;

  @Column({ type: Boolean, default: false })
  isAdmin: boolean;

  @Column({ type: String, nullable: true })
  validationToken?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => Major, (major) => major.users, {
    eager: true,
    nullable: true,
  })
  major?: Major;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((type) => Exam, (exam) => exam.examinees, { eager: true })
  exams: Exam[];
}
