import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import TeamAgentPool from './team-agent-pool';

// Define types for player data
interface Player {
  id: number;
  handle: string;
  photo_url: string;
  first_name: string;
  last_name: string;
  team: string;
  acronym: string;
  dark_logo_url: string;
  light_logo_url: string;
}

type PlayerDetails = {
  player_id: number;
  player_name: string;
  player_gender: string;
  match_id: any;
  player_totalKdaRation: string;
  player_kdaRatioPerMatch: string;
  player_totalCombatSckores: string;
  player_averageCombatScorePerMatch: string;
  player_gameWinRate: any;
  player_agentWinRate: any;
  player_mapWinRate: any;
};




function AnalysisTeam({id,tier,handle,image,player_name, first_name, last_name, team, acronym, dark_logo_url, light_logo_url}:any) {

  const supabase = createClientComponentClient();
  const [player, setPlayer] = useState<Player | null>(null); // Define state with Player type
  const [playerDetails, setPlayerDetails] = useState<PlayerDetails | null>(null); // Define state with Player type
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [plays, setPlays] = useState(null);
  const [win, setWin] = useState(null);
  const [winRate, setWinRate] = useState(null);
  const [agents, setAgents] = useState(null);
  const [maps, setMaps] = useState(null);
  
    // Fetch Details
    useEffect(() => {
      const fetchPlayer = async () => {
        let playerDetails = null;
        let detailsError = null;

        const fetchDetails = async (table: string, year: string) => {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('player_handle', handle)
            .eq('year', year)
            .limit(1)
            .single();
          return { data, error };
        };

        const tables = ['international-player-details', 'challengers-player-details', 'game-changer-player-details'];
        const years = ['2024', '2023', '2022'];

        for (const table of tables) {
          for (const year of years) {
            ({ data: playerDetails, error: detailsError } = await fetchDetails(table, year));
            if (!detailsError && playerDetails) break;
          }
          if (!detailsError && playerDetails) break;
        }

        if (!detailsError && playerDetails) {
          setPlayerDetails(playerDetails);
          setPlays(JSON.parse(playerDetails.player_gameWinRate).numberOfPlays);
          setWin(JSON.parse(playerDetails.player_gameWinRate).numberOfWins);
          setWinRate(JSON.parse(playerDetails.player_gameWinRate).winRate);
          setAgents(JSON.parse(playerDetails.player_agentWinRate));
          setMaps(JSON.parse(playerDetails.player_mapWinRate));
        }
      };

      fetchPlayer();
    }, [handle, selectedYear]);

  return (
    <div className='w-full'>
        <div className='flex flex-col justify-center items-center  gap-2 pb-2 '>
            <div className='bg-accent rounded-full overflow-hidden'>
                <Image src={'/placeholder/placeholder_val.png'} alt="logo" width={60} height={60} className='p-3 object-center'/>
            </div>
            <h1 className='text-lg font-bold '>
                {player_name}
            </h1>
        </div>
    </div>
  )
}

export default AnalysisTeam