import './globals.css';

import { GeistSans } from 'geist/font/sans';

import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';
import { authClient } from '@/lib/auth-client';

const title = 'Next.js + Postgres Auth Starter';
const description =
  'This is a Next.js starter kit that uses NextAuth.js for simple email + password login and a Postgres database to persist the data.';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
};


type NextAuthSession = {
  user: {
    name: string | null;
		email: string | null;
		image: string | null;
		role: string | null;
  };
  expires: any;
};

const { data: session } = await authClient.getSession();

const sessionData: NextAuthSession | null = 
{
  user: {
    name: session?.user?.name ?? null,
    email: session?.user?.email ?? null,
    image: session?.user?.image ?? null,
    role: null,
  },
  expires: session?.session?.expiresAt ?? null,
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        <SessionProvider session={sessionData}>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
