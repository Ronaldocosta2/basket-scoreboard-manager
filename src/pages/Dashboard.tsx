import { Trophy, Users, PlayCircle, Calendar, Activity, ArrowUpRight } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockChampionships, mockPlayers, mockGames } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { DashboardCharts } from '@/components/DashboardCharts';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const navigate = useNavigate();
  const liveGames = mockGames.filter(g => g.status === 'live');
  const activeChampionships = mockChampionships.filter(c => c.status === 'ongoing');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section Background Effect */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-5xl font-black mb-2 tracking-tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              BASKET PRO
            </h1>
            <p className="text-muted-foreground text-lg">Painel de Controle & Estatísticas</p>
          </div>
          <Button onClick={() => navigate('/game')} className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20">
            <PlayCircle className="mr-2 h-5 w-5" /> Jogo ao Vivo
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Campeonatos Ativos"
            value={activeChampionships.length}
            icon={Trophy}
            trend="+2 este mês"
            className="bg-card/50 backdrop-blur-sm border-primary/20"
          />
          <StatCard
            title="Jogadores"
            value={mockPlayers.length}
            icon={Users}
            trend="+12 novos"
            className="bg-card/50 backdrop-blur-sm border-primary/20"
          />
          <StatCard
            title="Jogos ao Vivo"
            value={liveGames.length}
            icon={Activity}
            trend="Em andamento"
            className="bg-card/50 backdrop-blur-sm border-orange-500/20"
          />
          <StatCard
            title="Próximos Jogos"
            value="8"
            icon={Calendar}
            trend="Esta semana"
            className="bg-card/50 backdrop-blur-sm border-primary/20"
          />
        </div>

        {/* Charts Section */}
        <DashboardCharts />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Games Column */}
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-500 animate-pulse" />
                Jogos em Tempo Real
              </CardTitle>
            </CardHeader>
            <CardContent>
              {liveGames.length > 0 ? (
                <div className="grid gap-4">
                  {liveGames.map((game) => (
                    <div
                      key={game.id}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-background to-secondary/50 p-6 border border-border/50 hover:border-orange-500/50 transition-all cursor-pointer"
                      onClick={() => navigate('/game')}
                    >
                      <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-5 w-5 text-orange-500" />
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 animate-pulse">
                          AO VIVO • Q{game.quarter}
                        </Badge>
                        <span className="font-mono text-sm text-muted-foreground">{game.timeRemaining}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="font-bold text-lg mb-1">{game.homeTeam}</p>
                          <p className="text-3xl font-black text-foreground">{game.homeScore}</p>
                        </div>
                        <div className="px-4 text-muted-foreground font-black text-xl opacity-20">VS</div>
                        <div className="text-center flex-1">
                          <p className="font-bold text-lg mb-1">{game.awayTeam}</p>
                          <p className="text-3xl font-black text-foreground">{game.awayScore}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <PlayCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Nenhum jogo acontecendo agora.</p>
                  <Button variant="link" onClick={() => navigate('/game')} className="mt-2 text-orange-500">
                    Iniciar um jogo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions & Championships */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-orange-600 to-red-700 text-white border-none shadow-xl">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">Gerenciar Liga</h2>
                <p className="text-white/80 mb-6 text-sm">
                  Acesse rapidamente as ferramentas administrativas.
                </p>
                <div className="grid gap-3">
                  <Button
                    variant="secondary"
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-none"
                    onClick={() => navigate('/championships')}
                  >
                    <Trophy className="mr-2 h-4 w-4" /> Campeonatos
                  </Button>
                  <Button
                    variant="secondary"
                    className="w-full justify-start bg-white/10 hover:bg-white/20 text-white border-none"
                    onClick={() => navigate('/players')}
                  >
                    <Users className="mr-2 h-4 w-4" /> Jogadores
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Campeonatos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeChampionships.map((championship) => (
                    <div
                      key={championship.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/championships/${championship.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium leading-none">{championship.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{championship.teams.length} times</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
