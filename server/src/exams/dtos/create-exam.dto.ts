import { Type } from "class-transformer";
import { IsDate, IsUUID } from "class-validator";

export class CreateExamDto {
  // Room ID
  @IsUUID()
  room: string;

  // Subject ID
  @IsUUID()
  subject: string;

  // When will the exam happen
  @Type(() => Date)
  @IsDate()
  when: Date;
}
