"use client"
import { LeagueCard } from '@/components/league_card'
import React from 'react'

export default function PlayersPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center -mt-20">
      <h1 className="sm:text-4xl font-bold text-center  text-2xl text-muted-foreground">TOURNAMENTS</h1>
      <div className="flex justify-center pt-10 ">
        <LeagueCard />
      </div>
    </div>
  )
}
