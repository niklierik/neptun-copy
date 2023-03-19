import { Logger } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { plainToClass, Type } from "class-transformer";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync,
} from "class-validator";
import * as fs from "fs";

let cfgObject: Config | undefined = undefined;

export class DbConnection {
  @IsString()
  @IsNotEmpty()
  host: string;
  @IsString()
  @IsNotEmpty()
  user: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsNumber()
  @Type(() => Number)
  port: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  schema: string;
}

export class Config {
  @Type(() => Number)
  @IsNumber()
  port: number;

  @Type(() => DbConnection)
  db: DbConnection;

  @Type(() => Number)
  saltingRounds: number;

  @IsString()
  @IsNotEmpty()
  jwtSecret: string;
  @IsNumber()
  @Type(() => Number)
  sessionsExpiresIn: number;

  @IsBoolean()
  @Type(() => Boolean)
  seed: boolean;
}

export function createTypeORMModuleCfg(): TypeOrmModuleOptions {
  readConfig();
  return {
    type: "oracle",
    host: cfg().db.host,
    port: cfg().db.port,
    username: cfg().db.user,
    password: cfg().db.password,
    database: cfg().db.name,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    logger: "file",
    schema: cfg().db.schema,
    migrations: ["./migrations/(*).ts"],
    migrationsTableName: "migrations",
    migrationsRun: true,
  };
}

function readCfgFile() {
  try {
    const content = fs.readFileSync("env.json", {
      encoding: "utf-8",
    });
    return content.toString();
  } catch (err) {
    Logger.error("Failed to load file.");
    throw err;
  }
}

function readConfig(): Promise<void> {
  if (cfgObject) {
    return;
  }
  const file = readCfgFile();
  const parsed = JSON.parse(file);
  const transformed = plainToClass(Config, parsed);
  const validated = validateSync(transformed);
  if (validated?.length) {
    Logger.error("Config file is not valid:");
    validated.forEach((err) => Logger.error(err));
    throw new Error("Unable to validate config file.");
  }
  cfgObject = transformed;
}

export function cfg() {
  readConfig();
  return cfgObject;
}
