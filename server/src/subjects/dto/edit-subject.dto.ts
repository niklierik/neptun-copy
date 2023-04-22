import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsUUID } from "class-validator";

export class EditSubjectDto {
  @IsUUID()
  id: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  credit?: number;
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  hoursAWeek?: number;
}
