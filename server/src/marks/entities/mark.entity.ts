import { Semester } from "src/courses/entities/course.entity";
import { Subject } from "src/subjects/entities/subject.entity";
import { User } from "src/users/entities/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("marks")
export class Mark {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => User, (user) => user.marks, {
    onDelete: "CASCADE",
    eager: false,
  })
  user: User;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Subject, {
    onDelete: "CASCADE",
    eager: true,
  })
  subject: Subject;

  @Column()
  mark: number;

  @Column()
  year: number;

  @Column("number")
  semester: Semester;
}
