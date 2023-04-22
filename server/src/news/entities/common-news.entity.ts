import { Subject } from "src/subjects/entities/subject.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("common_news")
export class CommonNews {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("clob")
  content: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Subject, (subject) => subject.news, {
    onDelete: "CASCADE",
    eager: false,
  })
  subject: Subject;

  @CreateDateColumn()
  createdAt: Date;
}
