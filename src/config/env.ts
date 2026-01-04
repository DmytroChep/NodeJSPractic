import dotenv from "dotenv";
import { cleanEnv, str } from "envalid";
import path from "path";

dotenv.config();
export const ENV = cleanEnv(process.env, {
	SECRET_KEY: str(),
});
