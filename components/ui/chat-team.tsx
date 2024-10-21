'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import YourTeam from '../your_team';

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

function ChatTeam({ players: initialPlayers }: { players: string[] }) {
  const supabase = createClientComponentClient();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const formattedPlayers = initialPlayers.map(player => {
      const parts = player.split(' ');
      return parts[parts.length - 1];
    });
    const fetchPlayers = async () => {
      const { data: playersData, error: playersError } = await supabase
        .from('all_players')
        .select('*')
        .in('handle', formattedPlayers); // Fetch all players in one query

      if (playersError) {
        console.error('Error fetching players:', playersError);
        return;
      }
      console.log(playersData)
      setPlayers(playersData || []); // Update state with fetched data
    };

    if (initialPlayers.length > 0) {
      fetchPlayers();
    }
  }, []);

  return (
    <div className='lg:block sm:hidden'>
      {/* Team Players Section */}
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle>Your Team</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-200px)] overflow-auto px-3">
            {players.map((player, index) => (
              <div key={index} className="flex items-center mb-4">
                <YourTeam id={player.id} tier={player.tier} image={player.photo_url} player_name={player.player_name} first_name={player.first_name} last_name={player.last_name} team={player.team} acronym={player.acronym} dark_logo_url={player.dark_logo_url} light_logo_url={player.light_logo_url}/>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChatTeam;