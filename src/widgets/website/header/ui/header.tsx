'use client';
import { Button } from '@/shared/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Moon, Sun, Menu, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAVIGATION, COMPANY } from '@/shared/lib/constants';
import Link from 'next/link';

export function WebsiteHeader() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored) {
      return stored === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  };

  useEffect(() => {
    applyTheme(darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/30 bg-neutral-50/30 backdrop-blur-md">
      <div className="flex h-16 items-center px-8">
        {/* Logo */}
        <Link
          href="/"
          className="mr-8"
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            {COMPANY.abbreviation}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 flex-1">
          {NAVIGATION.main.map((item) => (
            <div key={item.label}>
              {'sub_links' in item ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium text-neutral-700 transition-colors hover:text-primary-600">
                    <span>{item.label}</span>
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-neutral-50 border-neutral-200">
                    {item.sub_links.map((subItem) => (
                      <DropdownMenuItem
                        key={subItem.label}
                        asChild
                      >
                        <Link href={subItem.href}>{subItem.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-neutral-700 transition-colors hover:text-primary-600"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {/* Mobile menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-neutral-200 px-4 py-4 bg-neutral-50">
          {NAVIGATION.main.map((item) => (
            <div
              key={item.label}
              className="py-2"
            >
              {'sub_links' in item ? (
                <div>
                  <div className="font-medium text-neutral-700 mb-2">{item.label}</div>
                  {item.sub_links.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block pl-4 py-1 text-sm text-neutral-600 hover:text-primary-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block font-medium text-neutral-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
