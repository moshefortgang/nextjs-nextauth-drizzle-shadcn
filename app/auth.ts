import NextAuth, { CredentialsSignin, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { compare } from 'bcrypt-ts';
import Google from "next-auth/providers/google"

import { getUser } from 'app/db';
import { authConfig } from 'app/auth.config';

class InvalidLoginError extends CredentialsSignin {
	code = 'Invalid identifier or password'
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
		Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
			credentials: {
        email: {},
        password: {},
      },

			async authorize({ email, password }: any) {
        let user = await getUser(email);
        if (user.length === 0 || !user[0].password) throw new InvalidLoginError();
        let passwordsMatch = await compare(password, user[0].password!);
        if (passwordsMatch) return user[0] as User;
				throw new InvalidLoginError();
      },
    }),
  ],
});
