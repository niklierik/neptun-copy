import env from "../env.json";

export const cfg: {
  server: string;
} = env as any;

export function getUrl(end?: string) {
  if (!end) {
    return cfg.server;
  }
  return `${cfg.server}/${end}`;
}
