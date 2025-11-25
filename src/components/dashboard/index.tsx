import { SidebarLeft } from './sidebar';
import { SidebarProvider } from '../ui/sidebar';
import { DashboardContent } from './dashboard-content';

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/30 w-full">
        <SidebarLeft />
        <main className="flex-1 p-8">
          <DashboardContent />
        </main>
      </div>
    </SidebarProvider>
  );
}
