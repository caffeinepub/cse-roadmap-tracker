import { Link, useRouterState } from '@tanstack/react-router';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { LayoutDashboard, Calendar, CheckSquare, FolderGit2, FileText, TrendingUp, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Timeline', href: '/timeline', icon: Calendar },
  { name: 'Daily Planner', href: '/planner', icon: CheckSquare },
  { name: 'Projects', href: '/projects', icon: FolderGit2 },
  { name: 'Mock Tests', href: '/tests', icon: FileText },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            CSE Tracker
          </SheetTitle>
        </SheetHeader>
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
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
      </SheetContent>
    </Sheet>
  );
}
