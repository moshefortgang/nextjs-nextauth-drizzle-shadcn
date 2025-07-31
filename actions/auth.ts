'use server';

import { getUser, createUser } from '@/actions/user';
import { redirect } from 'next/navigation';

export async function register(data: any) {
  let user = await getUser(data.email);

  if (user.length > 0) {
		return  { message: 'A user with this identifier already exists' }
  } else {
    await createUser(data.email, data.password);
    redirect('/login');
  }
}
