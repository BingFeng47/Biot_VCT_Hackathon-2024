"use client";

import {
    Bar,
    BarChart,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip } from "./ui/tooltip";
import { Info } from "lucide-react";
import Image from "next/image";

export function MapAnalysis({ playerDetails }: any) {
    // Helper function to rank maps by team win rate
    const rankMapsByWinRate = (players: any) => {
        const mapStats: { [key: string]: { plays: number; wins: number } } = {};

        // Step 1: Aggregate plays and wins for each map across all players
        players.forEach((player: any) => {
            const mapWinRates = JSON.parse(player.player_mapWinRate);

            mapWinRates.forEach((mapEntry: any) => {
                const mapName = Object.keys(mapEntry)[0];
                const { numberOfPlays, numberOfWins } = mapEntry[mapName];

                if (!mapStats[mapName]) mapStats[mapName] = { plays: 0, wins: 0 };

                mapStats[mapName].plays += numberOfPlays;
                mapStats[mapName].wins += numberOfWins;
            });
        });

        // Step 2: Calculate win rates for each map
        const rankedMaps = Object.keys(mapStats).map(map => {
            const { plays, wins } = mapStats[map];
            const winRate = (wins / plays) * 100;
            return { map, winRate: parseFloat(winRate.toFixed(2)) };
        });

        // Step 3: Sort maps by win rate in descending order
        rankedMaps.sort((a, b) => b.winRate - a.winRate);

        return rankedMaps;
    };

    const rankedMaps = rankMapsByWinRate(playerDetails);

    // Generate dynamic chart data from rankedMaps
    const chartData = rankedMaps.map(({ map, winRate }) => ({
        map,
        winRate,
        fill: `hsla(var(--destructive))`, // Set opacity to 0.5
    }));

    // Configure chart labels
    const chartConfig: { [key: string]: { label: string; color: string } } = rankedMaps.reduce(
        (config: { [key: string]: { label: string; color: string } }, { map }) => {
            config[map] = { label: map, color: "hsl(var(--destructive))" };
            return config;
        },
        {} as { [key: string]: { label: string; color: string } }
    );

    return (
        <div className="flex flex-row gap-4">
            {/* Topp 3 Maps */}
             <Card className="w-1/2 pb-2">
            <CardHeader className="items-center pb-4">
                <CardTitle className="flex gap-2 items-center">
                    <h1>Top 4 Maps</h1>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="bg-accent rounded-full px-1">
                                <Info className="text-accent-foreground" width={16} />
                            </TooltipTrigger>
                            <TooltipContent className="bg-accent font-normal text-xs px-2 py-1 rounded-lg">
                                <h1>Team top 4 maps</h1>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
            </CardHeader>

            <CardContent className="pb-0">
                <div className="grid grid-cols-2 gap-2 items-center justify-center">
                    {rankedMaps.slice(0, 4).map(({ map, winRate }, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <Image src={`/map/${map.toLowerCase()}.png`} width={230} height={230} alt={map} className="rounded-lg" />
                            <div className="flex flex-col justify-center items-center">
                                <span className="text-sm font-medium">{map}</span>
                                <span className="text-sm text-muted-foreground">{winRate}%</span>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>


        {/* Stats */}
        <Card className="w-1/2 pb-2">
            <CardHeader className="items-center pb-4">
                <CardTitle className="flex gap-2 items-center">
                    <h1>Overall Team Map Performance</h1>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="bg-accent rounded-full px-1">
                                <Info className="text-accent-foreground" width={16} />
                            </TooltipTrigger>
                            <TooltipContent className="bg-accent font-normal text-xs px-2 py-1 rounded-lg">
                                <h1>Team average win rate on each map</h1>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardTitle>
            </CardHeader>

            <CardContent className="pb-0">
                <ChartContainer config={chartConfig} className="pb-4 ">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ left: 0, top:0}}
                    >
                        <YAxis
                            dataKey="map"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                            className="text-sm text-accent-foreground"
                        />
                        <XAxis dataKey="winRate" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="winRate" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
        </div>
       
    );
}