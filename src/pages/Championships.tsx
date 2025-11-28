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
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'upcoming':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'finished':
        return 'bg-muted text-muted-foreground border-border';
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
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section Background Effect */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Campeonatos</h1>
            <p className="text-muted-foreground">Gerencie todos os campeonatos</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20">
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
                <Button type="submit" onClick={handleAddChampionship} className="bg-orange-600 hover:bg-orange-700">Salvar Campeonato</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {championships.map((championship) => (
            <Card
              key={championship.id}
              className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-orange-500 transition-all cursor-pointer group"
              onClick={() => navigate(`/championships/${championship.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Trophy className="h-6 w-6 text-orange-500 group-hover:text-white" />
                  </div>
                  <Badge variant="outline" className={getStatusColor(championship.status)}>
                    {getStatusLabel(championship.status)}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold">{championship.name}</CardTitle>
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
                        <Badge key={idx} variant="secondary" className="text-xs bg-secondary/50">
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
