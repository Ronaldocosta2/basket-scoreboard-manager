import { Link, useLocation } from 'react-router-dom';
import { Trophy, Users, PlayCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: '/', icon: Trophy, label: 'Dashboard' },
    { to: '/championships', icon: Trophy, label: 'Campeonatos' },
    { to: '/players', icon: Users, label: 'Jogadores' },
    { to: '/game', icon: PlayCircle, label: 'Jogo ao Vivo' },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              BasketPro
            </span>
          </Link>

          <div className="flex gap-1">
            {links.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                  'hover:bg-secondary',
                  location.pathname === to
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
