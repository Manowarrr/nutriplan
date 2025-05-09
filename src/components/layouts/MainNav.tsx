'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/contexts/AuthContext';

const navItems = [
  { href: '/products', label: 'Products' },
  { href: '/dishes', label: 'Dishes' },
  { href: '/meal-plans', label: 'Meal Plans' },
  { href: '/settings', label: 'Settings' },
];

export function MainNav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href
              ? 'text-foreground'
              : 'text-muted-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
      {user && (
        <button
          onClick={() => signOut()}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Logout
        </button>
      )}
    </nav>
  );
} 