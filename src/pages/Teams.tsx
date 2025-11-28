import { useState } from 'react';
import { Plus, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useToast } from '@/hooks/use-toast';
import { Team } from '@/types/basketball';

const Teams = () => {
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Mock data
    const [teams, setTeams] = useState<Team[]>([
        { id: '1', name: 'Eagles', coach: 'John Doe', foundedYear: '1995' },
        { id: '2', name: 'Lions', coach: 'Jane Smith', foundedYear: '2001' },
        { id: '3', name: 'Tigers', coach: 'Mike Johnson', foundedYear: '1998' },
    ]);

    const [newTeam, setNewTeam] = useState({
        name: '',
        coach: '',
        foundedYear: '',
        logo: '',
    });

    const handleAddTeam = () => {
        if (!newTeam.name) {
            toast({
                title: "Erro",
                description: "O nome do time é obrigatório.",
                variant: "destructive"
            });
            return;
        }

        const team: Team = {
            id: Date.now().toString(),
            ...newTeam
        };

        setTeams([...teams, team]);
        setIsDialogOpen(false);
        setNewTeam({ name: '', coach: '', foundedYear: '', logo: '' });

        toast({
            title: "Sucesso!",
            description: "Time cadastrado com sucesso.",
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Times</h1>
                        <p className="text-muted-foreground">Gerencie as equipes da liga</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Novo Time
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Cadastrar Novo Time</DialogTitle>
                                <DialogDescription>
                                    Preencha os dados da nova equipe abaixo.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nome do Time</Label>
                                    <Input
                                        id="name"
                                        value={newTeam.name}
                                        onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                                        placeholder="Ex: Golden State Warriors"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="coach">Técnico</Label>
                                    <Input
                                        id="coach"
                                        value={newTeam.coach}
                                        onChange={(e) => setNewTeam({ ...newTeam, coach: e.target.value })}
                                        placeholder="Nome do treinador"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="year">Ano de Fundação</Label>
                                    <Input
                                        id="year"
                                        value={newTeam.foundedYear}
                                        onChange={(e) => setNewTeam({ ...newTeam, foundedYear: e.target.value })}
                                        placeholder="Ex: 1995"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="logo">URL do Logo</Label>
                                    <Input
                                        id="logo"
                                        value={newTeam.logo}
                                        onChange={(e) => setNewTeam({ ...newTeam, logo: e.target.value })}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleAddTeam}>Salvar Time</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team) => (
                        <Card key={team.id} className="hover:border-primary transition-colors group">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    {team.logo ? (
                                        <img src={team.logo} alt={team.name} className="h-12 w-12 object-contain" />
                                    ) : (
                                        <Shield className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                                    )}
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{team.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">Fundado em {team.foundedYear || 'N/A'}</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Users className="h-4 w-4" />
                                    <span>Técnico: {team.coach || 'Não informado'}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Teams;
