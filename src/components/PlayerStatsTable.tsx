import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface PlayerStats {
    rank: number;
    name: string;
    team: string;
    gamesPlayed: number;
    points: number;
    ppg: number; // Points Per Game
}

interface PlayerStatsTableProps {
    players: PlayerStats[];
}

export const PlayerStatsTable = ({ players }: PlayerStatsTableProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cestinhas do Campeonato</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Pos</TableHead>
                            <TableHead>Jogador</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead className="text-center">Jogos</TableHead>
                            <TableHead className="text-center">Total Pts</TableHead>
                            <TableHead className="text-center">Média (PPG)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {players.map((player) => (
                            <TableRow key={player.rank}>
                                <TableCell className="font-medium">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${player.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                                            player.rank === 2 ? 'bg-gray-100 text-gray-700' :
                                                player.rank === 3 ? 'bg-orange-100 text-orange-700' : ''
                                        }`}>
                                        {player.rank}º
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold">{player.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{player.team}</Badge>
                                </TableCell>
                                <TableCell className="text-center">{player.gamesPlayed}</TableCell>
                                <TableCell className="text-center font-bold text-lg">{player.points}</TableCell>
                                <TableCell className="text-center text-muted-foreground">{player.ppg.toFixed(1)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
