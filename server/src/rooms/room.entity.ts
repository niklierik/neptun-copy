import { Course } from "src/courses/entities/course.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("rooms", { name: "rooms" })
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  size: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Course, (course) => course.room, { eager: false })
  courses: Course[];

  @CreateDateColumn()
  createdAt: Date;
}
