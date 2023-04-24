import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateRoomDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  size: number;
  @IsString()
  name: string;
}
