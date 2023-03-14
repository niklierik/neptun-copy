import { Major } from "src/majors/entities/majors.entity";
import { Subject } from "src/subjects/subject.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

export enum RequirementType {
  REQIRED = 0,
  REQUIRED_CHOSEN = 1,
  CHOSEN = 2,
}

@Entity("education-chart")
export class EducationChart {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Subject, { eager: true })
  @PrimaryColumn()
  subject: Subject;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Major, { eager: true })
  @PrimaryColumn()
  major: Major;

  @Column()
  recommendedSemester: number;

  @Column("number")
  requirementType: RequirementType;
}
