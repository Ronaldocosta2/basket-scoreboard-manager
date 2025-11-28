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
        <div className="min-h-screen bg-background p-8">
            <div className="container mx-auto">
                <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate('/championships')}>
                    <ArrowLeft className="h-4 w-4" /> Voltar
                </Button>

                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Trophy className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">{championshipName}</h1>
                            <p className="text-muted-foreground">Detalhes e Destaques</p>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="highlights" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                        <TabsTrigger value="highlights">Destaques e Galeria</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <Card>
                            <CardHeader>
                                <CardTitle>Visão Geral</CardTitle>
                                <CardDescription>Informações gerais sobre o campeonato.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Em breve: Tabela de classificação e estatísticas.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="highlights">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Galeria de Destaques</h2>

                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="gap-2">
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
                                                    className="flex-1"
                                                >
                                                    <ImageIcon className="mr-2 h-4 w-4" /> Imagem
                                                </Button>
                                                <Button
                                                    variant={newHighlight.type === 'video' ? 'default' : 'outline'}
                                                    onClick={() => setNewHighlight({ ...newHighlight, type: 'video' })}
                                                    className="flex-1"
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
                                        <Button onClick={handleAddHighlight}>Salvar Destaque</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {highlights.map((item) => (
                                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
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
