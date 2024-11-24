import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { eq } from 'drizzle-orm';

import { users } from "../db/schema";
import * as schema from "../db/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";


export const db = drizzle(sql, { schema });

export async function getUser(email: string) {
	return await db.select().from(users).where(eq(users.email, email));
}
export async function createUser(email: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ email: email, password: hash });
}