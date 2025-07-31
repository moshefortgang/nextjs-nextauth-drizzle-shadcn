
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

export const db = process.env.NODE_ENV === 'production'
	? drizzle(
			postgres(`${process.env.POSTGRES_URL!}`, { max: 1 })
		)
	: drizzle(process.env.POSTGRES_URL as string);
