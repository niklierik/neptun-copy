import { ForumMsg } from "src/forums/forum-msg.entity";
import { News } from "src/news/news.entity";
import { Room } from "src/rooms/room.entity";
import { Subject } from "src/subjects/subject.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("courses", {
  name: "courses",
})
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Subject, (subject) => subject.courses, { eager: true })
  subject: Subject;

  @Column({ type: "interval day to second" })
  start: Date;

  @Column()
  dayOfWeek: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Room, (room) => room.courses, { eager: true })
  room: Room;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => ForumMsg, (forum) => forum.course, { eager: true })
  forum: ForumMsg[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => News, (news) => news.course, { eager: true })
  news: News[];

  @CreateDateColumn()
  createdAt: Date;
}
