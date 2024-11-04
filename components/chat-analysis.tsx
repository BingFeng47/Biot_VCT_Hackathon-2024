'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import YourTeam from './your_team';
import { AnalysisTab } from './analysis-tab';
import AnalysisTeam from './analysis-team';
import { Search, Trash } from 'lucide-react';
import { Button } from './ui/button';
import { AllPlayers } from './all_players';

// Define types for player data
interface Player {
  id: string;
  tier: string;
  handle: string;
  photo_url: string;
  player_name:string;
  first_name: string;
  last_name: string;
  team: string;
  acronym: string;
  dark_logo_url: string;
  light_logo_url: string;
  updated_at: string;
  created_at: string;
}

function ChatAnalysis({ players: initialPlayers, deletePlayer, addPlayer }: { players: string[], deletePlayer: (playerName: string) => void, addPlayer:  (playerName: string) => void}) {
  const supabase = createClientComponentClient();
  const [players, setPlayers] = useState<Player[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

    // const scrollAreaRef = useRef(null);
    const formattedPlayers = initialPlayers.map(player => {
      const parts = player.split(' ');
      return parts[parts.length - 1];
    });
    const fetchPlayers = async () => {
      const { data: playersData, error: playersError } = await supabase
    .from('all_players')
    .select('*')
    .order('created_at', { ascending: false })
    .or(formattedPlayers.map(player => `handle.ilike.${player}`).join(','));

      // if (playersError) {
      //   // console.error('Error fetching players:', playersError);
      //   return;
      // }
      // // console.log(playersData)
      // setPlayers(playersData || []); // Update state with fetched data


      if (playersData) {
        const uniquePlayers = playersData.reduce((acc: Player[], current: Player) => {
          const x = acc.find(item => item.player_name === current.player_name);
          if (!x) {
        return acc.concat([current]);
          } else {
        return acc.map(item => item.player_name === current.player_name && item.created_at < current.created_at ? current : item);
          }
        }, []);
  
      if (playersError) {
          setError(playersError);
        } else {
          setPlayers(uniquePlayers);;
        }
    };
  }
    

  useEffect(() => {
    if (initialPlayers.length > 0) {
      fetchPlayers();
    }
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className=''>
      {/* Team Players Section */}
      <Card className="bg-transparent text-sm">
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Team Stats and Analysis</CardTitle>
          <div className='flex flex-row gap-2'>
          <AllPlayers addPlayer={addPlayer}></AllPlayers>
          <Button variant='destructive' className=''>Analyze this team</Button>
          </div>
        </CardHeader>
        <CardContent>

        <div className="flex flex-wrap ">
          {players.map((player, index) => (
            <div key={index} className="flex flex-row w-1/5 p-2 gap-0 group">
              <AnalysisTeam id={player.id} handle={player.handle} tier={player.tier} image={player.photo_url} player_name={player.player_name} first_name={player.first_name} last_name={player.last_name} team={player.team} acronym={player.acronym} dark_logo_url={player.dark_logo_url} light_logo_url={player.light_logo_url}/>
              <Trash onClick={()=>deletePlayer(player.player_name)} className='text-destructive opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-10 cursor-pointer '/>
            </div>
          ))}
        </div>
        {
          players.length > 0?
          <AnalysisTab players={players}/>
          :
          <div>
            <h1 className='text-muted-foreground '>No Players Added! Search or add players from the list above to analyse your team</h1>
          </div>
        }
        </CardContent>
      </Card>
    </div>
  );
}

export default ChatAnalysis;

function setError(playersError: never) {
    throw new Error('Function not implemented.');
  }
