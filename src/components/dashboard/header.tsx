import { UserNav } from './user-nav';
import { ThemeToggle } from './theme-toggle';
import { NotificationsDropdown } from './notifications-dropdown';
import { Search } from './search';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <Search />
          <nav className="flex items-center space-x-4">
            <NotificationsDropdown />
            <ThemeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}