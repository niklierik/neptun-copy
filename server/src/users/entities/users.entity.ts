import { Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryColumn()
  @Generated("uuid")
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