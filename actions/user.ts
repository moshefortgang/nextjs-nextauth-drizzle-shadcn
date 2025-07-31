'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { genSaltSync, hashSync } from "bcrypt-ts";

export async function updateUserProfile(userId: string, data: {
  name?: string;
  email?: string;
  image?: string;
}) {
  await db.update(users)
    .set(data)
    .where(eq(users.id, userId));
  
  revalidatePath('/profile');
} 

export async function getUser(email: string) {
	return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  return await db.insert(users).values({ email: email, password: hash });
}