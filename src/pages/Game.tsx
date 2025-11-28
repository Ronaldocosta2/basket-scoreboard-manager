import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Play, Pause, RotateCcw, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ScoreDisplay } from '@/components/ScoreDisplay';

const Game = () => {
  const { toast } = useToast();
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(600); // 10 minutes
  const [gameFinished, setGameFinished] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && timeInSeconds > 0 && !gameFinished) {
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
  }, [isPlaying, timeInSeconds, gameFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const adjustScore = (team: 'home' | 'away', points: number) => {
    if (team === 'home') {
      setHomeScore(prev => Math.max(0, prev + points));
    } else {
      setAwayScore(prev => Math.max(0, prev + points));
    }
  };

  const nextQuarter = () => {
    if (quarter < 4) {
      setQuarter(prev => prev + 1);
      setTimeInSeconds(600);
      setIsPlaying(false);
      toast({
        title: `Quarto ${quarter + 1}`,
        description: 'Próximo período iniciado',
      });
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameFinished(true);
    setIsPlaying(false);

    // Save game summary
    const gameSummary = {
      id: `game-${Date.now()}`,
      homeTeam: 'Eagles',
      awayTeam: 'Lions',
      homeScore,
      awayScore,
      quarter,
      date: new Date().toISOString(),
      status: 'finished' as const,
    };

    // Get existing summaries from localStorage
    const existingSummaries = JSON.parse(localStorage.getItem('gameSummaries') || '[]');
    existingSummaries.push(gameSummary);
    localStorage.setItem('gameSummaries', JSON.stringify(existingSummaries));

    toast({
      title: 'Jogo Finalizado!',
      description: `Resultado: Eagles ${homeScore} x ${awayScore} Lions - Súmula salva com sucesso`,
    });
  };

  const resetGame = () => {
    setHomeScore(0);
    setAwayScore(0);
    setQuarter(1);
    setTimeInSeconds(600);
    setIsPlaying(false);
    setGameFinished(false);
    toast({
      title: 'Jogo Reiniciado',
      description: 'Novo jogo iniciado',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Jogo ao Vivo</h1>
          <p className="text-muted-foreground">Liga Nacional 2024</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-2 border-primary">
              <CardHeader className="bg-secondary">
                <div className="flex items-center justify-between">
                  <Badge className={isPlaying ? "bg-primary" : "bg-muted"}>
                    {gameFinished ? 'FINALIZADO' : isPlaying ? 'AO VIVO' : 'PAUSADO'}
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
                    <ScoreDisplay score={homeScore} teamName="Eagles" isHome={true} />

                    <div className="flex gap-2 justify-center flex-wrap">
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-blue-500 hover:text-white transition-colors" onClick={() => adjustScore('home', 1)}>
                        <span className="font-bold">+1</span>
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-blue-500 hover:text-white transition-colors" onClick={() => adjustScore('home', 2)}>
                        <span className="font-bold">+2</span>
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-blue-500 hover:text-white transition-colors" onClick={() => adjustScore('home', 3)}>
                        <span className="font-bold">+3</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-destructive" onClick={() => adjustScore('home', -1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* VS / Timer Center */}
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="text-6xl font-black text-muted-foreground/20 select-none">VS</div>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col gap-6">
                    <ScoreDisplay score={awayScore} teamName="Lions" isHome={false} />

                    <div className="flex gap-2 justify-center flex-wrap">
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-red-500 hover:text-white transition-colors" onClick={() => adjustScore('away', 1)}>
                        <span className="font-bold">+1</span>
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-red-500 hover:text-white transition-colors" onClick={() => adjustScore('away', 2)}>
                        <span className="font-bold">+2</span>
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-red-500 hover:text-white transition-colors" onClick={() => adjustScore('away', 3)}>
                        <span className="font-bold">+3</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-destructive" onClick={() => adjustScore('away', -1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center flex-wrap">
                  {!gameFinished && (
                    <>
                      <Button
                        variant={isPlaying ? 'default' : 'outline'}
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="gap-2"
                        disabled={timeInSeconds === 0}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="h-4 w-4" /> Pausar
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" /> Iniciar
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="gap-2" onClick={nextQuarter}>
                        <RotateCcw className="h-4 w-4" />
                        {quarter < 4 ? 'Próximo Quarto' : 'Finalizar Jogo'}
                      </Button>
                    </>
                  )}
                  {gameFinished && (
                    <Button variant="default" className="gap-2" onClick={resetGame}>
                      <RotateCcw className="h-4 w-4" />
                      Novo Jogo
                    </Button>
                  )}
                  {!gameFinished && (
                    <Button variant="destructive" className="gap-2" onClick={finishGame}>
                      <Save className="h-4 w-4" />
                      Finalizar e Salvar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Aproveitamento</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-secondary rounded p-2 text-center">
                        <p className="text-xs text-muted-foreground">Eagles</p>
                        <p className="text-lg font-bold">52%</p>
                      </div>
                      <div className="flex-1 bg-secondary rounded p-2 text-center">
                        <p className="text-xs text-muted-foreground">Lions</p>
                        <p className="text-lg font-bold">48%</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Rebotes</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-secondary rounded p-2 text-center">
                        <p className="text-lg font-bold">18</p>
                      </div>
                      <div className="flex-1 bg-secondary rounded p-2 text-center">
                        <p className="text-lg font-bold">15</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Assistências</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-secondary rounded p-2 text-center">
                        <p className="text-lg font-bold">12</p>
                      </div>
                      <div className="flex-1 bg-secondary rounded p-2 text-center">
                        <p className="text-lg font-bold">10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Últimas Jogadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-secondary rounded">
                    <p className="font-medium">Eagles - 2pts</p>
                    <p className="text-muted-foreground text-xs">Cesta de média distância</p>
                  </div>
                  <div className="p-2 bg-secondary rounded">
                    <p className="font-medium">Lions - 3pts</p>
                    <p className="text-muted-foreground text-xs">Bola de 3 pontos</p>
                  </div>
                  <div className="p-2 bg-secondary rounded">
                    <p className="font-medium">Eagles - Falta</p>
                    <p className="text-muted-foreground text-xs">Falta defensiva</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
