'use server';

import { db } from '@/app/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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