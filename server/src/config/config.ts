import { Logger } from "@nestjs/common";
import { plainToClass, Type } from "class-transformer";
import { IsNumber, validate } from "class-validator";
import { promises as fs } from "fs";

let cfgObject: Config | undefined = undefined;

export class DbConnection {
  host: string;
  user: string;
  password: string;
  @IsNumber()
  @Type(() => Number)
  port: number;

  name: string;
}

export class Config {
  @Type(() => Number)
  @IsNumber()
  port: number;

  @Type(() => DbConnection)
  db: DbConnection;

  @Type(() => Number)
  saltingRounds: number;
}

export function cfg() {
  return cfgObject;
}

async function readCfgFile() {
  try {
    const content = await fs.readFile("env.json", {
      encoding: "utf-8",
    });
    return content.toString();
  } catch (err) {
    Logger.error("Failed to load file.");
    throw err;
  }
}

export async function readConfig(): Promise<void> {
  const file = await readCfgFile();
  const parsed = JSON.parse(file);
  const transformed = plainToClass(Config, parsed);
  const validated = await validate(transformed);
  if (validated?.length) {
    Logger.error("Config file is not valid:");
    validated.forEach((err) => Logger.error(err));
    throw new Error("Unable to validate config file.");
  }
  cfgObject = transformed;
}
