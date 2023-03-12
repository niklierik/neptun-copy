import { ConflictException } from "@nestjs/common";

/**
 *
 *
 * @param err the error that was caught by try-catch
 * @param msg the message that will be passed into the ConflictException
 * @throws ConflictException if UniqueConstraint has failed
 */
export function throwIfUniqueConstraint(err: any, msg: string) {
  if (err?.message?.startsWith("ORA-00001") ?? false) {
    throw new ConflictException(msg);
  }
}
