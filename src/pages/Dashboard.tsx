import { Trophy, Users, PlayCircle, Calendar } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockChampionships, mockPlayers, mockGames } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const liveGames = mockGames.filter(g => g.status === 'live');
  const activeChampionships = mockChampionships.filter(c => c.status === 'ongoing');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do sistema de basquete</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Campeonatos Ativos"
            value={activeChampionships.length}
            icon={Trophy}
            trend="+2 este mês"
          />
          <StatCard
            title="Jogadores Cadastrados"
            value={mockPlayers.length}
            icon={Users}
            trend="+12 este mês"
          />
          <StatCard
            title="Jogos ao Vivo"
            value={liveGames.length}
            icon={PlayCircle}
            trend="Acontecendo agora"
          />
          <StatCard
            title="Próximos Jogos"
            value="8"
            icon={Calendar}
            trend="Nesta semana"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="h-5 w-5 text-primary" />
                Jogos ao Vivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {liveGames.length > 0 ? (
                <div className="space-y-4">
                  {liveGames.map((game) => (
                    <div
                      key={game.id}
                      className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
                      onClick={() => navigate('/game')}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-primary font-medium">
                          Q{game.quarter} - {game.timeRemaining}
                        </span>
                        <span className="text-xs text-muted-foreground">AO VIVO</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold">{game.homeTeam}</p>
                          <p className="text-2xl font-bold text-primary">{game.homeScore}</p>
                        </div>
                        <div className="px-4 text-muted-foreground">VS</div>
                        <div className="flex-1 text-right">
                          <p className="font-semibold">{game.awayTeam}</p>
                          <p className="text-2xl font-bold text-primary">{game.awayScore}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum jogo ao vivo no momento
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Campeonatos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeChampionships.map((championship) => (
                  <div
                    key={championship.id}
                    className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer"
                    onClick={() => navigate('/championships')}
                  >
                    <h3 className="font-semibold mb-2">{championship.name}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{championship.teams.length} times</span>
                      <span className="text-primary">{championship.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-8 rounded-xl bg-gradient-primary text-primary-foreground">
          <h2 className="text-2xl font-bold mb-2">Comece a gerenciar seus jogos</h2>
          <p className="mb-4 opacity-90">
            Cadastre campeonatos, adicione jogadores e acompanhe jogos em tempo real
          </p>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/championships')}
            >
              Criar Campeonato
            </Button>
            <Button
              variant="outline"
              className="border-primary-foreground/20 hover:bg-primary-foreground/10"
              onClick={() => navigate('/players')}
            >
              Adicionar Jogadores
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
