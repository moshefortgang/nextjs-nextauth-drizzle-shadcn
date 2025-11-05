import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const client = postgres(process.env.POSTGRES_URL!, { max: 1 });
export const db = drizzle(client, { schema });
