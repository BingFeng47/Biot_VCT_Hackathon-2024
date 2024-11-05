'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import YourTeam from '../your_team';
import { Button } from './button';

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
}

function ChatTeam({ players: initialPlayers, onPlayerClick, onAddAllClick }: { players: string[], onPlayerClick: (playerName: string) => void, onAddAllClick: () => void }) {
  
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
    .or(formattedPlayers.map(player => `handle.ilike.${player}`).join(','));

      if (playersError) {
        console.error('Error fetching players:', playersError);
        return;
      }
      console.log(playersData)
      setPlayers(playersData || []); // Update state with fetched data
    };

  useEffect(() => {
    if (initialPlayers.length > 0) {
      fetchPlayers();
    }
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className='lg:block sm:hidden'>
      {/* Team Players Section */}
      <Card className="bg-transparent text-sm">
        <CardHeader>
          <CardTitle className='flex flex-row items-center justify-between'>
            <p>Players</p>
            <Button  variant={'destructive'} onClick={()=>onAddAllClick()} >Add All</Button>
          </CardTitle>
          
        </CardHeader>
        <CardContent>
          <ScrollArea ref={scrollAreaRef} className="h-[calc(100vh-200px)] overflow-auto ">
            {players.map((player, index) => (
              <div key={index} className="flex items-center mb-4">
                <YourTeam onPlayerClick={onPlayerClick} id={player.id} handle={player.handle} tier={player.tier} image={player.photo_url} player_name={player.player_name} first_name={player.first_name} last_name={player.last_name} team={player.team} acronym={player.acronym} dark_logo_url={player.dark_logo_url} light_logo_url={player.light_logo_url}/>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChatTeam;