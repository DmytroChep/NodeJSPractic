import { cleanEnv, str } from "envalid";
import dotenv from "dotenv"
import path from "path"

dotenv.config();
export const ENV = cleanEnv(process.env, {
    SECRET_KEY: str(),
});