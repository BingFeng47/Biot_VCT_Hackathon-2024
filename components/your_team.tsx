import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import TeamAgentPool from './team-agent-pool';
import { Plus } from 'lucide-react';


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




function YourTeam({id,tier,handle,image,player_name, first_name, last_name, team, acronym, dark_logo_url, light_logo_url, onPlayerClick}:any) {

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
        <div className="flex flex-row gap-2 items-center border rounded-lg border-accent overflow-auto px-3 ">
            
            <div className='flex h-40 w-52 flex-1 items-center justify-center '>
              {
                tier == 'game-changer'?
                <Image  
                src={"/placeholder/placeholder_woman.png"}
                // src={image && 
                //   image !== "http://static.lolesports.com/players/1643734200321_silhouette_transparent.png" && 
                //   image !== "http://static.lolesports.com/players/1675077993344_silhouette_transparent.png" && 
                //   image !== "https://lolstatic-a.akamaihd.net/esports-assets/production/player/zerost-4v5o369r.png" && 
                //   image !== "https://static.lolesports.com/players/1678371423205_silhouette_transparent.png" && 
                //   image !== "https://s3.us-west-2.amazonaws.com/static.lolesports.com/players/default-headshot.png" ? `${image}` 
                //   : "https://lolstatic-a.akamaihd.net/esports-assets/production/player/aslan-7nd6ux13.png?w=50&h=50&fit=crop"} 
                  alt="player_image"  width={250} height={250} className='rounded-lg object-contain'/>
                :
                <Image  
                src={"/placeholder/placeholder_man.png"}
                // src={image && 
                //   image !== "http://static.lolesports.com/players/1643734200321_silhouette_transparent.png" && 
                //   image !== "http://static.lolesports.com/players/1675077993344_silhouette_transparent.png" && 
                //   image !== "https://lolstatic-a.akamaihd.net/esports-assets/production/player/zerost-4v5o369r.png" && 
                //   image !== "https://static.lolesports.com/players/1678371423205_silhouette_transparent.png" && 
                //   image !== "https://s3.us-west-2.amazonaws.com/static.lolesports.com/players/default-headshot.png" ? `${image}` 
                //   : "https://lolstatic-a.akamaihd.net/esports-assets/production/player/aslan-7nd6ux13.png?w=50&h=50&fit=crop"} 
                  alt="player_image"  width={250} height={250} className='rounded-lg object-contain'/>

              }
           </div>

            <div className='flex flex-col gap-2 w-1/2 text-xs'>
            <div className='flex flex-row items-center gap-2'>
                <div>
                <div className='bg-accent rounded-full'>
                <Image src={'/placeholder/placeholder_val.png'} alt="logo" width={30} height={30} className='p-1 object-center'/>

                  {/* {
                light_logo_url?
                <Image src={light_logo_url} alt="logo" width={40} height={40} className='p-1 object-center'/>
                :
                <Image src={dark_logo_url} alt="logo" width={40} height={40} className='p-1 object-center'/>
                  }
                 */}
                </div>
                </div>
                <h1 className='text-xs font-bold '>
                  {player_name}
                </h1>
            </div>
            <TeamAgentPool agents={agents || []} />
            <div className='flex flex-row gap-1'>
                <Button 
                  variant="destructive" 
                  className='text-xs font-bold w-2/3' 
                  onClick={() => window.open(`/players/${tier}/${id}`, '_blank')}
                >
                  View Player
                </Button>

              <Button variant="outline" className='text-xs font-bold w-1/3' 
              onClick={()=>{
                onPlayerClick(player_name)
                
              }
              }>
                <p>+</p></Button>
            </div>

            
            </div>
        </div>
    </div>
  )
}

export default YourTeam