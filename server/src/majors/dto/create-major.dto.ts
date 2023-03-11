import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateMajorDto {
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  majorID: string;

  @MinLength(3)
  @MaxLength(128)
  displayName: string;
}
