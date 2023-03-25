import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("seeded")
export class Seeded {
  @PrimaryColumn()
  id: number;

  @Column()
  run: boolean;
}
