import { useState } from 'react';
import { Plus, User, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockPlayers } from '@/lib/mockData';
import { Player } from '@/types/basketball';

const Players = () => {
  const [players] = useState<Player[]>(mockPlayers);

  const getPositionLabel = (position: Player['position']) => {
    const labels = {
      PG: 'Armador',
      SG: 'Ala-Armador',
      SF: 'Ala',
      PF: 'Ala-Pivô',
      C: 'Pivô',
    };
    return labels[position];
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section Background Effect */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Jogadores</h1>
            <p className="text-muted-foreground">Gerencie todos os jogadores cadastrados</p>
          </div>
          <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20">
            <Plus className="h-4 w-4" />
            Novo Jogador
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {players.map((player) => (
            <Card key={player.id} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-orange-500 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{player.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-orange-500 border-orange-500/50">
                      #{player.number}
                    </Badge>
                    <Badge variant="secondary" className="bg-secondary/50">{player.position}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {getPositionLabel(player.position)}
                  </p>
                  {player.team && (
                    <div className="flex items-center gap-1 text-sm text-orange-500 font-medium">
                      <Trophy className="h-3 w-3" />
                      <span>{player.team}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Players;
