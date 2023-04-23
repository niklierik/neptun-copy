import { Major } from "src/majors/entities/majors.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum RequirementType {
  REQIRED = 0,
  REQUIRED_CHOSEN = 1,
  CHOSEN = 2,
}

@Entity("education_chart")
export class EducationChart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Subject, (subject) => subject, {
    onDelete: "CASCADE",
    eager: true,
  })
  subject: Subject;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Major, {
    onDelete: "CASCADE",
    eager: true,
  })
  major: Major;

  @Column()
  recommendedSemester: number;

  @Column("number")
  requirementType: RequirementType;

  @CreateDateColumn()
  createdAt: Date;
}
