import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const pointsData = [
    { name: "J1", points: 140 },
    { name: "J2", points: 155 },
    { name: "J3", points: 135 },
    { name: "J4", points: 170 },
    { name: "J5", points: 160 },
    { name: "J6", points: 190 },
    { name: "J7", points: 185 },
];

const winDistributionData = [
    { name: "Eagles", value: 400, color: "#f97316" }, // Orange-500
    { name: "Lions", value: 300, color: "#3b82f6" },  // Blue-500
    { name: "Bulls", value: 300, color: "#ef4444" },  // Red-500
    { name: "Others", value: 200, color: "#94a3b8" }, // Slate-400
];

export const DashboardCharts = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="col-span-1 bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <CardTitle>Tendência de Pontuação (Últimos Jogos)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={pointsData}>
                            <defs>
                                <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#f8fafc" }}
                                itemStyle={{ color: "#f97316" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="points"
                                stroke="#f97316"
                                fillOpacity={1}
                                fill="url(#colorPoints)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1 bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <CardTitle>Distribuição de Vitórias</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={winDistributionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {winDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#f8fafc" }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                        {winDistributionData.map((entry) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className="text-sm text-muted-foreground">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
