import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import {
  ChartLine,
  FolderOpen,
  Settings,
  Users
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: ChartLine
  },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: FolderOpen
  },
  {
    name: 'Forecasts',
    href: '/dashboard/forecasts',
    icon: ChartLine
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-6">
          <span className="text-lg font-bold">ForecastPro</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                  isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}