import { IsString, Length, Matches } from "class-validator";
import {
  pwdReqRegex,
  pwdReqMessage,
  pwdLenMessage,
} from "./change-password.dto";

export class FinishRegistrationDto {
  @IsString()
  @Length(8, 40, { message: pwdLenMessage })
  @Matches(pwdReqRegex, {
    message: pwdReqMessage,
  })
  newPassword: string;

  @IsString()
  newPasswordAgain: string;

  @IsString()
  token: string;
}
