import { Subject } from "src/subjects/entities/subject.entity";
import { User } from "src/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("common_forum")
export class CommonForumMsg {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => User, {
    onDelete: "CASCADE",
    eager: false,
  })
  sender: User;

  @Column("clob")
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Subject, (subject) => subject.forum, {
    onDelete: "CASCADE",
    eager: false,
  })
  subject: Subject;
}
