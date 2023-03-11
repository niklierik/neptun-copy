import { IsString, Length, Matches } from "class-validator";

/**
 * https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
 *
 * Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
 */
export const pwdReqRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$/;

export const pwdReqMessage =
  "A jelszó nem felel meg az elvárásoknak. Legalább egy kis-, egy nagybetűt és egy szám karaktert kell tartalmaznia.";

export const pwdLenMessage = "A jelszó hosszának 8 és 40 közt kell lennie.";

export class ChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  @Length(8, 40, { message: pwdLenMessage })
  @Matches(pwdReqRegex, {
    message: pwdReqMessage,
  })
  newPassword: string;

  @IsString()
  newPasswordAgain: string;
}
