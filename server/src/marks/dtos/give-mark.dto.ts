import { Type } from "class-transformer";
import { IsString, IsUUID } from "class-validator";

export class GiveMarkDto {
  @Type(() => Number)
  mark: number;
  @IsString()
  target: string;
  @IsUUID()
  course: string;
}
