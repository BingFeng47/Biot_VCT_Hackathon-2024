"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Tooltip } from "./ui/tooltip"
import { Info } from "lucide-react"

export const description = "A radar chart"



const chartConfig = {
  desktop: {
    label: "score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function TeamScore({playerDetails}:any ) {
// Initialize totals for scores, wins, and plays
let totalCombatScore = 0;
let totalKdaRatio = 0;
let totalWins = 0;
let totalPlays = 0; // Track total plays for win rate calculation

playerDetails.forEach((player:any) => {
    // Convert scores to numbers to avoid NaN
    const combatScore = Number(player.player_averageCombatScorePerMatch);
    const kdaRatio = Number(player.player_kdaRatioPerMatch);

    // Accumulate scores if they are valid numbers
    if (!isNaN(combatScore)) {
        totalCombatScore += combatScore;
    }
    if (!isNaN(kdaRatio)) {
        totalKdaRatio += kdaRatio;
    }

    // Safely parse win rate data with error handling
    let winRateData = { numberOfWins: 0, numberOfPlays: 0 };
    try {
        winRateData = player.player_gameWinRate ? JSON.parse(player.player_gameWinRate) : winRateData;
    } catch (error) {
        console.error("Error parsing win rate data for player:", player.player_name, error);
    }

    totalWins += winRateData.numberOfWins;
    totalPlays += winRateData.numberOfPlays; // Accumulate total plays
});

// Calculate averages for the team
const numberOfPlayers = playerDetails.length;

let averageCombatScore = 0;
let averageKdaRatio = 0;
let averageWinRate = 0;

if (numberOfPlayers > 0) {
    averageCombatScore = totalCombatScore / numberOfPlayers;
    averageKdaRatio = totalKdaRatio / numberOfPlayers;
    averageWinRate = totalPlays > 0 ? (totalWins / totalPlays) * 100 : 0; // Calculate average win rate correctly
}

// Standardize the data for the chart
const maxCombatScore = 7000; // Example max value for combat score standardization
const maxKdaRatio = 3; // Example max value for KDA ratio standardization
const maxWinRate = 100; // Max value for win rate is already in percentage

// Adjust the formulas to ensure they stay within 0-100
const standardizedCombatScore = Math.min(((averageCombatScore / maxCombatScore) * 100), 100).toFixed(2);
const standardizedKdaRatio = Math.min(((averageKdaRatio / maxKdaRatio) * 100), 100).toFixed(2);
const standardizedWinRate = Math.min(averageWinRate, 100).toFixed(2); // Ensure win rate is capped at 100

// Prepare chart data
const chartData = [
    { strength: "Team ACS", score: standardizedCombatScore }, // Average combat score
    { strength: "Team KDA", score: standardizedKdaRatio }, // Average KDA ratio
    { strength: "Team Win Rate", score: standardizedWinRate }, // Average win rate
];



  return (
    <Card className="w-full">
      <CardHeader className="items-center pb-4">
        <CardTitle className="flex gap-2 items-center">
          <h1>Team Overall Scores</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="bg-accent rounded-full px-1"><Info className="text-accent-foreground" width={16}/></TooltipTrigger>
              <TooltipContent className="bg-accent px-2 font-normal text-xs py-1 rounded-lg">
                <p>Averaged Scores of All Selected Players</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </CardTitle>
        {/* <CardDescription>
          Team strengths
        </CardDescription> */}
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className=""
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="strength" />
            <PolarGrid />
            <Radar
              dataKey="score"
              fill="hsl(var(--destructive))"
              fillOpacity={0.8}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">

      </CardFooter> */}
    </Card>
  )
}
