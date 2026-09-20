import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useSession } from '@/contexts/SessionContext';
import { DatabricksLogo } from '@/components/DatabricksLogo'; // eslint-disable-line
import { DbIcon } from '@/components/ui/db-icon';
import { UserKeyIconIcon } from '@/components/icons';

export default function ChatLayout() {
  const { session, loading } = useSession();
  const isCollapsed = localStorage.getItem('sidebar:state') !== 'true';

  // Wait for session to load
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // No guest mode - redirect if no session
  if (!session?.user) {
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #2272b4 0%, #2db0a0 50%, #9b6ae8 100%)',
        }}
      >
        <div className="flex flex-col items-center gap-6">
          <div
            className="flex size-16 items-center justify-center rounded-2xl shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #2272b4 0%, #2db0a0 50%, #9b6ae8 100%)',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1v-7h3z" />
              <path d="M3 19a2 2 0 0 0 2 2h1v-7H3z" />
            </svg>
          </div>
          <div className="flex w-80 flex-col items-center gap-4 rounded-2xl border border-white/20 bg-white/95 p-10 shadow-2xl backdrop-blur-sm">
            <DbIcon icon={UserKeyIconIcon} size={32} color="muted" />
            <div className="flex flex-col items-center gap-1.5 text-center">
              <h3 className="text-lg font-semibold">Customer Service Portal</h3>
              <p className="text-sm text-muted-foreground">
                Please sign in with Databricks to access the customer service portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get preferred username from session (if available from headers)
  const preferredUsername = session.user.preferredUsername ?? null;

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar user={session.user} preferredUsername={preferredUsername} />
      <SidebarInset
        className="h-svh overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--color-grey-050) 0%, var(--background) 30%)',
        }}
      >
        <div className="flex flex-1 flex-col overflow-hidden bg-background md:my-2 md:mr-2 md:rounded-xl md:shadow-lg">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
