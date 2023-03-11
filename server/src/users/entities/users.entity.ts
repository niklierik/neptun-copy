import { Major } from "src/majors/entities/majors.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

@Entity({
  name: "users",
})
export class User {
  @PrimaryColumn({ type: String })
  email: string;

  @Column({ type: String })
  password: string;

  @Column({ type: String })
  familyname: string;

  @Column({ type: String })
  forename: string;

  @Column({ type: String })
  address: string;

  @Column({ type: Date })
  birthdate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: Boolean, default: false })
  isValid: boolean;

  @Column({ type: Boolean, default: false })
  isAdmin: boolean;

  @Column({ type: String })
  validationToken?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => Major, (major) => major.users, { eager: true })
  major?: Major;
}
