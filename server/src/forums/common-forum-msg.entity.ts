import { Subject } from "src/subjects/subject.entity";
import { User } from "src/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

@Entity("common_forum")
export class CommonForumMsg {
  @PrimaryColumn()
  id: number;

  @Column()
  sender: User;

  @Column("clob")
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Subject, (subject) => subject.forum, { eager: false })
  @PrimaryColumn()
  subject: Subject;
}
