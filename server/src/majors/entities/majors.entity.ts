import { User } from "src/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

@Entity({
  name: "majors",
})
export class Major {
  @PrimaryColumn()
  majorID: string;

  @Column()
  displayName: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => User, (user) => user.major, {
    onDelete: "CASCADE",
    eager: false,
  })
  users: User[];

  @CreateDateColumn()
  createdAt: Date;
}
