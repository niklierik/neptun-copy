import { Major } from "src/majors/entities/majors.entity";
import { Subject } from "src/subjects/subject.entity";
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
  @ManyToOne((type) => Subject, { eager: true })
  subject: Subject;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Major, { eager: true })
  major: Major;

  @Column()
  recommendedSemester: number;

  @Column("number")
  requirementType: RequirementType;

  @CreateDateColumn()
  createdAt: Date;
}
