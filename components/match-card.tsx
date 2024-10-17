'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Trophy } from "lucide-react"

export function MatchCard({datetime, home,rounds, team1, team2, winner, logo1, logo2}:any) {
  return (
    <Card className="w-full max-w-md px-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{datetime}</span>
          </div>
          {
            winner === 'error: details missing'?
            <Badge variant="secondary" className="font-normal">
             N/A
            </Badge>
            :
            <Badge variant="secondary" className="font-normal">
            {rounds} Rounds
            </Badge>
            
          }
          
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col items-center">
            <img
              src={logo1}
              alt="team1"
              className="w-20 h-20 object-contain rounded-full mb-2 bg-accent p-3"
            />
            <span className="font-semibold text-sm truncate max-w-20">{team1}</span>
          </div>
          <div className="text-2xl font-bold">VS</div>
          <div className="flex flex-col items-center">
            <img
              src={logo2}
              alt="team2"
              className="w-20 h-20 object-contain rounded-full mb-2 bg-accent p-3"
            />
            <span className="font-semibold text-sm truncate max-w-20">{team2}</span>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 bg-accent py-2 rounded-md">
          <span className="font-medium">
          {
            winner === home?
            <div className="flex flex-row gap-4 justify-center items-center">
              <Trophy className="h-4 w-4" />
              <span className="text-accent-foreground font-bold text-sm">{winner}</span>
            </div>
           : 
            winner === 'error: details missing'?
            <span className=" font-bold text-sm text-destructive">N/A</span>
          :
            <span className=" font-bold text-sm text-muted-foreground">{winner}</span>

          }
          </span>
        </div>
      </CardContent>
    </Card>
  )
}