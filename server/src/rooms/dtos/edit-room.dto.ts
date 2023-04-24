import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsUUID, Min } from "class-validator";

export class EditRoomDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  size?: number;
  @IsUUID()
  id: string;
}
