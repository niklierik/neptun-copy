import { genSalt, hash } from "bcrypt";
import { cfg } from "src/config/config";

export async function hashPwd(pwd: string) {
  const salt = await genSalt(cfg().saltingRounds);
  const hashedPwd = await hash(pwd, salt);
  return hashedPwd;
}
