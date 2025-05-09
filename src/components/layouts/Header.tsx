'use client';

import Link from 'next/link';
import { MainNav } from './MainNav';
import { useAuth } from '@/lib/contexts/AuthContext';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-lg text-primary">NutriPlan</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user && <MainNav />}
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
        </div>
      </div>
    </header>
  );
} 