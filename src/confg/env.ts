import { cleanEnv, str } from "envalid";

export const ENV = cleanEnv(process.env, {
    SECKERT_KEY: str(),
});