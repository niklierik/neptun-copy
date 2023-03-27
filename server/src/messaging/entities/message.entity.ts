import { User } from "src/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("clob")
  message: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => User, (user) => user.sentMessages, { eager: false })
  from: User;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => User, (user) => user.receivedMessages, { eager: false })
  to: User;

  @CreateDateColumn()
  createdAt: Date;
}
