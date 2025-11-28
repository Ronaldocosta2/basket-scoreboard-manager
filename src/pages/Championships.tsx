import { useState } from 'react';
import { Plus, Trophy, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockChampionships } from '@/lib/mockData';
import { Championship } from '@/types/basketball';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Championships = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [championships, setChampionships] = useState<Championship[]>(mockChampionships);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [newChampionship, setNewChampionship] = useState({
    name: '',
    startDate: '',
    endDate: '',
    teams: '',
  });

  const handleAddChampionship = () => {
    if (!newChampionship.name || !newChampionship.startDate || !newChampionship.endDate) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const teamsList = newChampionship.teams.split(',').map(t => t.trim()).filter(t => t !== '');

    const championship: Championship = {
      id: `champ-${Date.now()}`,
      name: newChampionship.name,
      startDate: newChampionship.startDate,
      endDate: newChampionship.endDate,
      status: 'upcoming',
      teams: teamsList.length > 0 ? teamsList : ['Time A', 'Time B'], // Default teams if empty
      games: []
    };

    setChampionships([...championships, championship]);
    setIsDialogOpen(false);
    setNewChampionship({ name: '', startDate: '', endDate: '', teams: '' });

    toast({
      title: "Sucesso!",
      description: "Campeonato criado com sucesso.",
    });
  };

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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Campeonato
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Campeonato</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo campeonato abaixo.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value={newChampionship.name}
                    onChange={(e) => setNewChampionship({ ...newChampionship, name: e.target.value })}
                    className="col-span-3"
                    placeholder="Ex: Liga de Verão"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start" className="text-right">
                    Início
                  </Label>
                  <Input
                    id="start"
                    type="date"
                    value={newChampionship.startDate}
                    onChange={(e) => setNewChampionship({ ...newChampionship, startDate: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end" className="text-right">
                    Fim
                  </Label>
                  <Input
                    id="end"
                    type="date"
                    value={newChampionship.endDate}
                    onChange={(e) => setNewChampionship({ ...newChampionship, endDate: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teams" className="text-right">
                    Times
                  </Label>
                  <Input
                    id="teams"
                    value={newChampionship.teams}
                    onChange={(e) => setNewChampionship({ ...newChampionship, teams: e.target.value })}
                    className="col-span-3"
                    placeholder="Separe por vírgula"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddChampionship}>Salvar Campeonato</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {championships.map((championship) => (
            <Card
              key={championship.id}
              className="hover:border-primary transition-colors cursor-pointer"
              onClick={() => navigate(`/championships/${championship.id}`)}
            >
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
