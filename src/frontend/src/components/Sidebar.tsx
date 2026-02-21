import { Link, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, Calendar, CheckSquare, FolderGit2, FileText, TrendingUp, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Timeline', href: '/timeline', icon: Calendar },
  { name: 'Daily Planner', href: '/planner', icon: CheckSquare },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'Mock Tests', href: '/tests', icon: FileText },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
];

export default function Sidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Rocket className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">CSE Tracker</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <Separator />

      <div className="p-4">
        <div className="rounded-lg bg-accent/50 p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Stay consistent and track your progress daily!
          </p>
        </div>
      </div>
    </div>
  );
}
