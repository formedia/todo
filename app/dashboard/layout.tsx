import SideNav from '@/app/ui/dashboard/sidenav';
import Todo from '@/app/ui/todo/todo';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import StoreProvider from '../lib/features/provider';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('dashboard layout');
  const session = await auth();
  return (
    <ThemeProvider themes={['light', 'dark', 'blue']} defaultTheme="light">
      <SessionProvider session={session}>
        <StoreProvider>
          <div className="blue:text-blue-400 flex h-screen flex-col md:flex-row md:overflow-hidden dark:text-red-400">
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
              {children}
            </div>
            <div className="w-full md:w-64">
              <Todo />
            </div>
          </div>
        </StoreProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
