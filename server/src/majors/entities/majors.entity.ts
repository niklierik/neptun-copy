import { User } from "src/users/entities/users.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({
  name: "majors",
})
export class Major {
  @PrimaryColumn()
  majorID: string;

  @Column()
  displayName: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => User, (user) => user.major, { eager: false })
  users: User[];
}
