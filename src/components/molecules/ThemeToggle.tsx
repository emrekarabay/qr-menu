'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

// Header'dan ayrıştırılmış bağımsız tema değiştirici atom
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 hover:bg-muted rounded-full transition-colors"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
