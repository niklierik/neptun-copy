import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { SubjectType } from "../entities/subject-type.enum";

export class CreateSubjectDto {
  @IsString()
  displayName: string;
  @IsNumber()
  @Type(() => Number)
  credit: number;
  @IsNumber()
  @Type(() => Number)
  hoursAWeek: number;
  @IsNumber()
  @Type(() => Number)
  type: SubjectType;
}
