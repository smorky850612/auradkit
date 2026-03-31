import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Layers, Wand2, Settings } from 'lucide-react';

export function Header() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
    } catch {
      // localStorage unavailable (private browsing, etc.)
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/0.95)] backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background)/0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block text-[hsl(var(--foreground))]">Woody 디자인 라이브러리</span>
            <span className="sm:hidden text-[hsl(var(--foreground))]">Woody</span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]'
              }`}
            >
              라이브러리
            </Link>
            <Link
              to="/builder"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/builder'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              프롬프트 빌더
            </Link>
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/admin'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:block">용어 관리</span>
            </Link>
            <button
              onClick={() => setDark(!dark)}
              className="ml-2 p-2 rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))] transition-colors"
              aria-label="테마 전환"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
