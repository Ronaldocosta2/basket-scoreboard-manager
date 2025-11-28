import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TeamStats {
    position: number;
    name: string;
    points: number;
    played: number;
    won: number;
    lost: number;
    pointsFor: number;
    pointsAgainst: number;
    balance: number;
}

interface StandingsTableProps {
    groupName: string;
    teams: TeamStats[];
}

export const StandingsTable = ({ groupName, teams }: StandingsTableProps) => {
    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>{groupName}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Pos</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead className="text-center">Pts</TableHead>
                            <TableHead className="text-center">J</TableHead>
                            <TableHead className="text-center">V</TableHead>
                            <TableHead className="text-center">D</TableHead>
                            <TableHead className="text-center">PF</TableHead>
                            <TableHead className="text-center">PC</TableHead>
                            <TableHead className="text-center">S</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teams.map((team) => (
                            <TableRow key={team.name}>
                                <TableCell className="font-medium">{team.position}º</TableCell>
                                <TableCell className="font-bold">{team.name}</TableCell>
                                <TableCell className="text-center font-bold">{team.points}</TableCell>
                                <TableCell className="text-center">{team.played}</TableCell>
                                <TableCell className="text-center text-green-600">{team.won}</TableCell>
                                <TableCell className="text-center text-red-600">{team.lost}</TableCell>
                                <TableCell className="text-center">{team.pointsFor}</TableCell>
                                <TableCell className="text-center">{team.pointsAgainst}</TableCell>
                                <TableCell className="text-center">{team.balance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
