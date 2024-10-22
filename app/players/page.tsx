"use client"
import { LeagueCard } from '@/components/league_card'
import React from 'react'

export default function PlayersPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center  -mt-10">
      <h1 className="text-4xl font-bold text-center text-muted-foreground mb-8">Tier</h1>
      <div className="flex justify-center pt-10 ">
        <LeagueCard />
      </div>
    </div>
  )
}
