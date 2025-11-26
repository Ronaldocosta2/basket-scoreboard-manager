import { useState } from 'react';
import { Plus, Trophy, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockChampionships } from '@/lib/mockData';
import { Championship } from '@/types/basketball';

const Championships = () => {
  const [championships] = useState<Championship[]>(mockChampionships);

  const getStatusColor = (status: Championship['status']) => {
    switch (status) {
      case 'ongoing':
        return 'bg-primary';
      case 'upcoming':
        return 'bg-team-home';
      case 'finished':
        return 'bg-muted';
    }
  };

  const getStatusLabel = (status: Championship['status']) => {
    switch (status) {
      case 'ongoing':
        return 'Em andamento';
      case 'upcoming':
        return 'Em breve';
      case 'finished':
        return 'Finalizado';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Campeonatos</h1>
            <p className="text-muted-foreground">Gerencie todos os campeonatos</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Campeonato
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {championships.map((championship) => (
            <Card key={championship.id} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className={getStatusColor(championship.status)}>
                    {getStatusLabel(championship.status)}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{championship.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(championship.startDate).toLocaleDateString('pt-BR')} -{' '}
                      {new Date(championship.endDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{championship.teams.length} times participando</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-2">Times:</p>
                    <div className="flex flex-wrap gap-1">
                      {championship.teams.map((team, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {team}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Championships;
