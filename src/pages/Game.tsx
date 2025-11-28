import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Play, Pause, RotateCcw, Save, Trophy, History, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlayerStatsTable, PlayerStats } from '@/components/PlayerStatsTable';
import { Team } from '@/types/basketball';

// Mock Teams Data (in a real app, this would come from a context or API)
const MOCK_TEAMS: Team[] = [
  { id: '1', name: 'Eagles', logo: '', coach: 'John Doe' },
  { id: '2', name: 'Lions', logo: '', coach: 'Jane Smith' },
  { id: '3', name: 'Tigers', logo: '', coach: 'Mike Johnson' },
  { id: '4', name: 'Bulls', logo: '', coach: 'Steve Kerr' },
  { id: '5', name: 'Warriors', logo: '', coach: 'Popovich' },
];

// Mock Players for each team (simplified)
const MOCK_PLAYERS: Record<string, string[]> = {
  'Eagles': ['J. Smith', 'M. Johnson', 'D. Williams', 'K. Brown', 'L. Davis'],
  'Lions': ['R. Wilson', 'T. Moore', 'S. Taylor', 'A. Anderson', 'C. Thomas'],
  'Tigers': ['B. White', 'G. Harris', 'P. Martin', 'R. Thompson', 'J. Garcia'],
  'Bulls': ['M. Jordan', 'S. Pippen', 'D. Rodman', 'T. Kukoc', 'S. Kerr'],
  'Warriors': ['S. Curry', 'K. Thompson', 'D. Green', 'A. Wiggins', 'K. Looney'],
};

interface GameHistory {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  winner: string;
}

const Game = () => {
  const { toast } = useToast();

  // Game State
  const [gameStatus, setGameStatus] = useState<'setup' | 'live' | 'finished'>('setup');
  const [homeTeam, setHomeTeam] = useState<string>('');
  const [awayTeam, setAwayTeam] = useState<string>('');

  // Live Game State
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(600); // 10 minutes

  // Stats State
  const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);

  // Scoring Dialog State
  const [isScoringDialogOpen, setIsScoringDialogOpen] = useState(false);
  const [scoringTeam, setScoringTeam] = useState<'home' | 'away' | null>(null);
  const [pointsToAdd, setPointsToAdd] = useState(0);

  // Load history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('gameHistory');
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && timeInSeconds > 0 && gameStatus === 'live') {
      interval = setInterval(() => {
        setTimeInSeconds((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timeInSeconds, gameStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartGame = () => {
    if (!homeTeam || !awayTeam) {
      toast({ title: "Erro", description: "Selecione os dois times.", variant: "destructive" });
      return;
    }
    if (homeTeam === awayTeam) {
      toast({ title: "Erro", description: "Os times devem ser diferentes.", variant: "destructive" });
      return;
    }

    // Initialize player stats for selected teams
    const initialStats: PlayerStats[] = [];

    // Add Home Players
    (MOCK_PLAYERS[homeTeam] || []).forEach(name => {
      initialStats.push({ rank: 0, name, team: homeTeam, gamesPlayed: 1, points: 0, ppg: 0 });
    });

    // Add Away Players
    (MOCK_PLAYERS[awayTeam] || []).forEach(name => {
      initialStats.push({ rank: 0, name, team: awayTeam, gamesPlayed: 1, points: 0, ppg: 0 });
    });

    setPlayerStats(initialStats);
    setHomeScore(0);
    setAwayScore(0);
    setQuarter(1);
    setTimeInSeconds(600);
    setGameStatus('live');
    setIsPlaying(false);
  };

  const openScoringDialog = (team: 'home' | 'away', points: number) => {
    setScoringTeam(team);
    setPointsToAdd(points);
    setIsScoringDialogOpen(true);
  };

  const handleScore = (playerName: string) => {
    if (!scoringTeam) return;

    // Update Score
    if (scoringTeam === 'home') {
      setHomeScore(prev => prev + pointsToAdd);
    } else {
      setAwayScore(prev => prev + pointsToAdd);
    }

    // Update Player Stats
    setPlayerStats(prev => {
      const newStats = prev.map(p => {
        if (p.name === playerName && p.team === (scoringTeam === 'home' ? homeTeam : awayTeam)) {
          return { ...p, points: p.points + pointsToAdd, ppg: p.points + pointsToAdd }; // Simplified PPG for live game
        }
        return p;
      });

      // Re-sort and update ranks
      return newStats
        .sort((a, b) => b.points - a.points)
        .map((p, index) => ({ ...p, rank: index + 1 }));
    });

    setIsScoringDialogOpen(false);
    toast({
      title: "Cesta!",
      description: `${pointsToAdd} pontos para ${playerName} (${scoringTeam === 'home' ? homeTeam : awayTeam})`,
    });
  };

  const nextQuarter = () => {
    if (quarter < 4) {
      setQuarter(prev => prev + 1);
      setTimeInSeconds(600);
      setIsPlaying(false);
      toast({ title: `Quarto ${quarter + 1}`, description: 'Próximo período iniciado' });
    } else {
      handleFinishGame();
    }
  };

  const handleFinishGame = () => {
    setGameStatus('finished');
    setIsPlaying(false);

    const winner = homeScore > awayScore ? homeTeam : awayScore > homeScore ? awayTeam : 'Empate';

    const newHistoryItem: GameHistory = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      winner
    };

    const updatedHistory = [newHistoryItem, ...gameHistory];
    setGameHistory(updatedHistory);
    localStorage.setItem('gameHistory', JSON.stringify(updatedHistory));

    toast({
      title: 'Jogo Finalizado!',
      description: `Vencedor: ${winner}`,
    });
  };

  const handleNewGame = () => {
    setGameStatus('setup');
    setHomeTeam('');
    setAwayTeam('');
  };

  // --- RENDER HELPERS ---

  if (gameStatus === 'setup') {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Novo Jogo</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" /> Time da Casa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setHomeTeam} value={homeTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o time" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_TEAMS.map(team => (
                      <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" /> Time Visitante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setAwayTeam} value={awayTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o time" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_TEAMS.map(team => (
                      <SelectItem key={team.id} value={team.name}>{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mb-12">
            <Button size="lg" onClick={handleStartGame} className="w-full md:w-1/3 text-lg h-12">
              <Play className="mr-2 h-5 w-5" /> Iniciar Partida
            </Button>
          </div>

          {gameHistory.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <History className="h-6 w-6" /> Histórico de Jogos
              </h2>
              <div className="grid gap-4">
                {gameHistory.map(game => (
                  <Card key={game.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="text-sm text-muted-foreground">{game.date}</div>
                      <div className="flex items-center gap-4 font-bold text-lg">
                        <span className={game.winner === game.homeTeam ? 'text-primary' : ''}>{game.homeTeam}</span>
                        <span className="text-2xl">{game.homeScore}</span>
                        <span className="text-muted-foreground text-sm">x</span>
                        <span className="text-2xl">{game.awayScore}</span>
                        <span className={game.winner === game.awayTeam ? 'text-primary' : ''}>{game.awayTeam}</span>
                      </div>
                      <Badge variant="outline">{game.winner === 'Empate' ? 'Empate' : `Vencedor: ${game.winner}`}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Jogo ao Vivo</h1>
            <p className="text-muted-foreground">{homeTeam} vs {awayTeam}</p>
          </div>
          {gameStatus === 'finished' && (
            <Button onClick={handleNewGame}>
              <RotateCcw className="mr-2 h-4 w-4" /> Novo Jogo
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Scoreboard Area */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-primary">
              <CardHeader className="bg-secondary">
                <div className="flex items-center justify-between">
                  <Badge className={isPlaying ? "bg-primary" : "bg-muted"}>
                    {gameStatus === 'finished' ? 'FINALIZADO' : isPlaying ? 'AO VIVO' : 'PAUSADO'}
                  </Badge>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Quarto</p>
                    <p className="text-2xl font-bold">{quarter}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Tempo</p>
                    <p className="text-2xl font-bold">{formatTime(timeInSeconds)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
                  {/* Home Team */}
                  <div className="flex flex-col gap-6">
                    <ScoreDisplay score={homeScore} teamName={homeTeam} isHome={true} />
                    {gameStatus === 'live' && (
                      <div className="flex gap-2 justify-center flex-wrap">
                        {[1, 2, 3].map(pts => (
                          <Button key={pts} variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-blue-500 hover:text-white" onClick={() => openScoringDialog('home', pts)}>
                            <span className="font-bold">+{pts}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* VS */}
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="text-6xl font-black text-muted-foreground/20 select-none">VS</div>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col gap-6">
                    <ScoreDisplay score={awayScore} teamName={awayTeam} isHome={false} />
                    {gameStatus === 'live' && (
                      <div className="flex gap-2 justify-center flex-wrap">
                        {[1, 2, 3].map(pts => (
                          <Button key={pts} variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-red-500 hover:text-white" onClick={() => openScoringDialog('away', pts)}>
                            <span className="font-bold">+{pts}</span>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-4 justify-center flex-wrap">
                  {gameStatus === 'live' && (
                    <>
                      <Button
                        variant={isPlaying ? 'default' : 'outline'}
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="gap-2"
                        disabled={timeInSeconds === 0}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isPlaying ? 'Pausar' : 'Iniciar'}
                      </Button>
                      <Button variant="outline" className="gap-2" onClick={nextQuarter}>
                        <RotateCcw className="h-4 w-4" />
                        {quarter < 4 ? 'Próximo Quarto' : 'Finalizar Jogo'}
                      </Button>
                      <Button variant="destructive" className="gap-2" onClick={handleFinishGame}>
                        <Save className="h-4 w-4" /> Finalizar Agora
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Area */}
          <div className="space-y-6">
            <PlayerStatsTable players={playerStats.slice(0, 5)} />
          </div>
        </div>

        {/* Scoring Dialog */}
        <Dialog open={isScoringDialogOpen} onOpenChange={setIsScoringDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quem marcou {pointsToAdd} pontos?</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              {scoringTeam && (MOCK_PLAYERS[scoringTeam === 'home' ? homeTeam : awayTeam] || []).map(player => (
                <Button key={player} variant="outline" className="justify-start" onClick={() => handleScore(player)}>
                  {player}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Game;
