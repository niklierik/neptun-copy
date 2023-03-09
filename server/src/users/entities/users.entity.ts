import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  @Generated("uuid")
  password: string;

  @Column()
  familyname: string;

  @Column()
  forename: string;

  @Column()
  address: string;
}
