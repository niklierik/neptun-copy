import env from "../../env.json";

export const cfg = env;

export function getServerUrl(url: string) {
  return `${env.server}/${url}`;
}
