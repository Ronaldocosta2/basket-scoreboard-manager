import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Image as ImageIcon, Video, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { StandingsTable, TeamStats } from '@/components/StandingsTable';
import { PlayerStatsTable, PlayerStats } from '@/components/PlayerStatsTable';

interface Highlight {
    id: string;
    title: string;
    description: string;
    type: 'image' | 'video';
    url: string;
    date: string;
}

const ChampionshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Mock data - in a real app, fetch based on ID
    const championshipName = "Liga Nacional 2024";

    const [highlights, setHighlights] = useState<Highlight[]>([
        {
            id: '1',
            title: 'Enterrada da Vitória',
            description: 'Jogada decisiva nos últimos segundos.',
            type: 'video',
            url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800', // Placeholder image for video
            date: '2024-03-15',
        },
        {
            id: '2',
            title: 'Comemoração do Título',
            description: 'Equipe levantando a taça.',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1519766304800-c9519df91474?auto=format&fit=crop&q=80&w=800',
            date: '2024-03-15',
        }
    ]);

    const [newHighlight, setNewHighlight] = useState({
        title: '',
        description: '',
        type: 'image' as 'image' | 'video',
        url: '',
    });

    // Mock Standings Data
    const groupA: TeamStats[] = [
        { position: 1, name: 'Eagles', points: 6, played: 3, won: 3, lost: 0, pointsFor: 245, pointsAgainst: 210, balance: 35 },
        { position: 2, name: 'Lions', points: 5, played: 3, won: 2, lost: 1, pointsFor: 230, pointsAgainst: 220, balance: 10 },
        { position: 3, name: 'Tigers', points: 4, played: 3, won: 1, lost: 2, pointsFor: 215, pointsAgainst: 235, balance: -20 },
        { position: 4, name: 'Bears', points: 3, played: 3, won: 0, lost: 3, pointsFor: 200, pointsAgainst: 225, balance: -25 },
    ];

    const groupB: TeamStats[] = [
        { position: 1, name: 'Warriors', points: 6, played: 3, won: 3, lost: 0, pointsFor: 260, pointsAgainst: 200, balance: 60 },
        { position: 2, name: 'Bulls', points: 5, played: 3, won: 2, lost: 1, pointsFor: 240, pointsAgainst: 230, balance: 10 },
        { position: 3, name: 'Lakers', points: 4, played: 3, won: 1, lost: 2, pointsFor: 220, pointsAgainst: 240, balance: -20 },
        { position: 4, name: 'Celtics', points: 3, played: 3, won: 0, lost: 3, pointsFor: 190, pointsAgainst: 240, balance: -50 },
    ];

    // Mock Player Stats Data
    const topPlayers: PlayerStats[] = [
        { rank: 1, name: 'Michael Jordan', team: 'Bulls', gamesPlayed: 3, points: 98, ppg: 32.7 },
        { rank: 2, name: 'LeBron James', team: 'Lakers', gamesPlayed: 3, points: 85, ppg: 28.3 },
        { rank: 3, name: 'Stephen Curry', team: 'Warriors', gamesPlayed: 3, points: 82, ppg: 27.3 },
        { rank: 4, name: 'Kevin Durant', team: 'Eagles', gamesPlayed: 3, points: 78, ppg: 26.0 },
        { rank: 5, name: 'Giannis Antetokounmpo', team: 'Lions', gamesPlayed: 3, points: 75, ppg: 25.0 },
    ];

    const handleAddHighlight = () => {
        if (!newHighlight.title || !newHighlight.url) {
            toast({
                title: "Erro",
                description: "Título e URL são obrigatórios.",
                variant: "destructive"
            });
            return;
        }

        const highlight: Highlight = {
            id: Date.now().toString(),
            ...newHighlight,
            date: new Date().toISOString().split('T')[0],
        };

        setHighlights([highlight, ...highlights]);
        setIsDialogOpen(false);
        setNewHighlight({ title: '', description: '', type: 'image', url: '' });

        toast({
            title: "Sucesso!",
            description: "Destaque adicionado à galeria.",
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Hero Section Background Effect */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <Button variant="ghost" className="mb-6 gap-2 hover:bg-orange-500/10 hover:text-orange-500" onClick={() => navigate('/championships')}>
                    <ArrowLeft className="h-4 w-4" /> Voltar
                </Button>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-xl bg-orange-500/10 flex items-center justify-center">
                            <Trophy className="h-8 w-8 text-orange-500" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">{championshipName}</h1>
                            <p className="text-muted-foreground">Detalhes e Destaques</p>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="highlights" className="space-y-6">
                    <TabsList className="bg-secondary/50 backdrop-blur-sm">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Visão Geral</TabsTrigger>
                        <TabsTrigger value="highlights" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Destaques e Galeria</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <StandingsTable groupName="Grupo A" teams={groupA} />
                                <StandingsTable groupName="Grupo B" teams={groupB} />
                            </div>
                            <PlayerStatsTable players={topPlayers} />
                        </div>
                    </TabsContent>

                    <TabsContent value="highlights">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Galeria de Destaques</h2>

                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="gap-2 bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20">
                                        <Plus className="h-4 w-4" /> Adicionar Destaque
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Novo Destaque</DialogTitle>
                                        <DialogDescription>Adicione uma foto ou vídeo à galeria.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="title">Título</Label>
                                            <Input
                                                id="title"
                                                value={newHighlight.title}
                                                onChange={(e) => setNewHighlight({ ...newHighlight, title: e.target.value })}
                                                placeholder="Ex: Jogada Incrível"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="type">Tipo</Label>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant={newHighlight.type === 'image' ? 'default' : 'outline'}
                                                    onClick={() => setNewHighlight({ ...newHighlight, type: 'image' })}
                                                    className={`flex-1 ${newHighlight.type === 'image' ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                                                >
                                                    <ImageIcon className="mr-2 h-4 w-4" /> Imagem
                                                </Button>
                                                <Button
                                                    variant={newHighlight.type === 'video' ? 'default' : 'outline'}
                                                    onClick={() => setNewHighlight({ ...newHighlight, type: 'video' })}
                                                    className={`flex-1 ${newHighlight.type === 'video' ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                                                >
                                                    <Video className="mr-2 h-4 w-4" /> Vídeo
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="url">URL da Mídia</Label>
                                            <Input
                                                id="url"
                                                value={newHighlight.url}
                                                onChange={(e) => setNewHighlight({ ...newHighlight, url: e.target.value })}
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="desc">Descrição</Label>
                                            <Textarea
                                                id="desc"
                                                value={newHighlight.description}
                                                onChange={(e) => setNewHighlight({ ...newHighlight, description: e.target.value })}
                                                placeholder="Detalhes sobre o momento..."
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleAddHighlight} className="bg-orange-600 hover:bg-orange-700">Salvar Destaque</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {highlights.map((item) => (
                                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group bg-card/50 backdrop-blur-sm border-primary/20 hover:border-orange-500">
                                    <div className="aspect-video relative overflow-hidden bg-muted">
                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white border-none">
                                                {item.type === 'video' ? <Video className="h-3 w-3 mr-1" /> : <ImageIcon className="h-3 w-3 mr-1" />}
                                                {item.type === 'video' ? 'Vídeo' : 'Foto'}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ChampionshipDetails;
