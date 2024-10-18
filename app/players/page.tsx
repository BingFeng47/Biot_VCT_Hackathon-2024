"use client"
import { LeagueCard } from '@/components/league_card'
import React from 'react'

export default function PlayersPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center  -mt-20">
      <h1 className="font-bold text-center  text-lg lg:text-3xl text-muted-foreground">CATEGORIES</h1>
      <div className="flex justify-center pt-10 ">
        <LeagueCard />
      </div>
    </div>
  )
}
