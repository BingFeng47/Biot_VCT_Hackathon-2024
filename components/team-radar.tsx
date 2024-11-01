"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export const description = "A radar chart"



const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function TeamRadar({roles}:any ) {
    const roleCounts = roles.reduce((acc: any, role: string) => {
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {});

    const duelistCount = roleCounts['Duelist'] || 0;
    const controllerCount = roleCounts['Controller'] || 0;
    const initiatorCount = roleCounts['Initiator'] || 0;
    const sentinelCount = roleCounts['Sentinel'] || 0;

    const aggressivenessScore = duelistCount * 5 + sentinelCount * 2 + controllerCount * 2 + initiatorCount * 3;
    const defensivenessScore = duelistCount * 2 + sentinelCount * 5 + controllerCount * 3 + initiatorCount * 3;
    const controlScore = duelistCount * 2 + sentinelCount * 3 + controllerCount * 5 + initiatorCount * 4;
    const supportScore = duelistCount * 1 + sentinelCount * 4 + controllerCount * 3 + initiatorCount * 5;

    const chartData = [
        { strength: "Aggresive", score: aggressivenessScore },
        { strength: "Control", score: controlScore },
        { strength: "Defensive", score: defensivenessScore },
        { strength: "Support", score: supportScore },

      ]
  return (
    <Card className="w-full">
      <CardHeader className="items-center pb-4">
        <CardTitle className="flex gap-2 items-center">
          <h1>Team Strength Analysis</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="bg-accent rounded-full px-1"><Info className="text-accent-foreground" width={16}/></TooltipTrigger>
              <TooltipContent className="bg-accent">
                <p>Team Strength Based on Numbers of Roles</p>
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
            //   label={{ fill: "hsl(var(--destructive))", fontSize: 15, }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
      </CardFooter> */}
    </Card>
  )
}
