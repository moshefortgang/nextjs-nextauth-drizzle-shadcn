import { SidebarProvider } from '@/components/ui/sidebar';
import '@/app/globals.css';

import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/header';

const title = 'Admin Page';
const description = '';

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
