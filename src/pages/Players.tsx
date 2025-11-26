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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Jogadores</h1>
            <p className="text-muted-foreground">Gerencie todos os jogadores cadastrados</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Jogador
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {players.map((player) => (
            <Card key={player.id} className="hover:border-primary transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{player.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-primary border-primary">
                      #{player.number}
                    </Badge>
                    <Badge variant="secondary">{player.position}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {getPositionLabel(player.position)}
                  </p>
                  {player.team && (
                    <div className="flex items-center gap-1 text-sm text-primary">
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
