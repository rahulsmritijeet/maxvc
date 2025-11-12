'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path) => pathname === path;

  return (
    <nav className="glass sticky top-0 z-50 border-b theme-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">CyberSculptors</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              href="/explore" 
              className={`transition-all ${isActive('/explore') ? 'theme-accent font-semibold' : 'theme-text-secondary hover:theme-text'}`}
            >
              Explore
            </Link>
            <Link 
              href="/profile" 
              className={`transition-all ${isActive('/profile') ? 'theme-accent font-semibold' : 'theme-text-secondary hover:theme-text'}`}
            >
              Profile
            </Link>
            <Link 
              href="/create" 
              className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover-lift"
            >
              Launch
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}