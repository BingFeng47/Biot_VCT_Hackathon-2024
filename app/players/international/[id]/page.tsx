'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ChevronDown, Dice1, Frown, Gamepad2, Sparkles, Swords, Trophy } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import AgentPool from '@/components/agent-pool';
import MapPool from '@/components/map-pool';
import { MatchCard } from '@/components/match-card';

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

export default function PlayerPage() {
  const { id } = useParams(); // Access the ID from the URL
  const supabase = createClientComponentClient();
  const [player, setPlayer] = useState<Player | null>(null); // Define state with Player type
  const [playerDetails, setPlayerDetails] = useState<PlayerDetails | null>(null); // Define state with Player type
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2022");
  const [plays, setPlays] = useState(null);
  const [win, setWin] = useState(null);
  const [winRate, setWinRate] = useState(null);
  const [agents, setAgents] = useState(null);
  const [maps, setMaps] = useState(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [logos, setLogos] = useState<any[]>([]);


// Fetch Details
  useEffect(() => {
    const fetchPlayer = async () => {
      const { data: playerData, error: playerError } = await supabase
        .from('international-players')
        .select('*')
        .eq('id', id)
        .single(); // Use single() to get a single row since we're querying by ID
  
      if (playerError) {
        console.error('Error fetching player:', playerError);
        return;
      }
  
      setPlayer(playerData);


      // get logos
      const { data: logos, error: logoError } = await supabase
        .from('international-players')
        .select('team, dark_logo_url, light_logo_url');
      
      if (logoError) {
        console.error('Error fetching logo:', logoError);
        return;
      }

      if (logos) {
        setLogos(logos);
      }
      if (logoError) {
        console.error('Error fetching logo:', logoError);
        return;
      }

  
      // Fetch player details based on the fetched player data and selectedYear
      const { data: playerDetails, error: detailsError } = await supabase
        .from('international-player-details')
        .select('*')
        .eq('player_handle', playerData?.handle)
        .eq('year', selectedYear)
        .single();
  
      if (detailsError) {
        setPlayerDetails(null);
        setPlays(null) 
        setWin(null) 
        setWinRate(null) 
        setAgents(null) 
        setMaps(null) 
      } else {
        setPlayerDetails(playerDetails);
        setPlays(JSON.parse(playerDetails.player_gameWinRate).numberOfPlays) 
        setWin(JSON.parse(playerDetails.player_gameWinRate).numberOfWins) 
        setWinRate(JSON.parse(playerDetails.player_gameWinRate).winRate) 
        setAgents(JSON.parse(playerDetails.player_agentWinRate)) 
        setMaps(JSON.parse(playerDetails.player_mapWinRate)) 
        setMatches(JSON.parse(playerDetails.match_id)) 
      }
    };
    setMatches([]);
    fetchPlayer();
  }, [id, selectedYear]); 


  // If could not find player, display error message
  if (!player) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className='flex flex-col items-center justify-center flex-grow p-20 gap-5'>
          <Frown size={66} className="text-muted-foreground" />
          <h2 className="text-2xl text-muted-foreground">Opps, there is problem loading the player... </h2>
        </div>
      </div>
    ) // Display loading state until data is fetched
  }
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;


  return (
    <div className="flex flex-col min-h-screen px-20">
      <div id='playerDetails' className='pt-10 pb-10'>
        <div className='flex flex-row gap-8 items-center pb-6'>
          {/* check theme and use didfferent logo */}
            {currentTheme === 'dark' ? (
            player.light_logo_url ? (
              <TeamLogo src={player.light_logo_url} alt="Light Logo"/>
            ) : (
              <TeamLogo src={player.dark_logo_url} alt="Dark Logo" />
            )
            ) : (
            player.dark_logo_url ? (
              <div className='bg-accent rounded-full'>
              <TeamLogo src={player.dark_logo_url} alt="Dark Logo" />
              </div>
            ) : (
              <TeamLogo src={player.light_logo_url} alt="Light Logo" />
            )
            )}
              <h1 className='text-6xl font-bold'>
                <span className="text-muted-foreground">{player.acronym} </span> {player.handle}
              </h1>

          <div>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className='px-4 text-lg'>{selectedYear}<ChevronDown size={20} className='pl-1'/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-14 mt-2 text-center">
            <DropdownMenuLabel>Year</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setSelectedYear("2022")}>
                2022
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedYear("2023")}>
                2023
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedYear("2024")}>
                2024
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
          </DropdownMenu>
          
          </div>

        </div>

        <div className='flex flex-row gap-10'>
          {isLoading && (
            <div className="flex justify-center items-center text-center">
              <div className="loader text-center">Loading...</div> {/* This can be a spinner or any loading indicator */}
            </div>
          )}
          {player.photo_url ? (
              <Image src={player.photo_url} alt={player.handle} width={400} height={400} className='rounded-lg' onLoadingComplete={() => setIsLoading(false)} />
            ) : (
              <Image src={'https://lolstatic-a.akamaihd.net/esports-assets/production/player/aslan-7nd6ux13.png?w=400&h=400&fit=crop'} width={400} height={400} alt={player.handle}  onLoadingComplete={() => setIsLoading(false)} />
            )
          }

          <div className='flex flex-col gap-6 justify-center items-start border-2 p-10 border-dashed rounded-lg'>
            <h1 className='text-md'>Player Details</h1>
            <h1 className='text-md'>Team: <span className='text-2xl pl-16'>{player.team}</span> </h1>
            <h1 className='text-md'>First Name: <span className='text-2xl pl-6'>{player.first_name}</span> </h1>
            <h1 className='text-md'>Last Name: <span className='text-2xl pl-6'>{player.last_name}</span> </h1>
          </div>
          {
            playerDetails?(
                <div className='flex flex-row flex-grow px-5 gap-5 border-2 border-dashed rounded-lg justify-evenly items-center'>
                  <div className='flex items-center gap-5'>
                    <Swords width={55} height={55}/>
                    <div className='flex flex-col justify-start gap-1'>
                      <h1 className='text-lg text-muted-foreground font-bold'>ACS</h1>
                      <h1 className='text-4xl font-bold'>{Math.round(parseFloat(playerDetails?.player_averageCombatScorePerMatch || '0'))}</h1> 
                    </div>
                  </div>

                  <div className='flex items-center gap-5'>
                    <Gamepad2 width={55} height={55} className=''/>
                    <div className='flex flex-col justify-start gap-1'>
                      <h1 className='text-lg text-muted-foreground font-bold'>Match Played</h1>
                      <h1 className='text-4xl font-bold'>{plays}</h1> 
                    </div>
                  </div>

                  <div className='flex items-center gap-5'>
                    <Trophy width={55} height={55}/>
                    <div className='flex flex-col justify-start gap-1'>
                      <h1 className='text-lg text-muted-foreground font-bold'>Match Wins</h1>
                      <h1 className='text-4xl font-bold'>{win}</h1> 
                    </div>
                  </div>

                  <div className='flex items-center gap-5'>
                    <Sparkles width={55} height={55}/>
                    <div className='flex flex-col justify-start gap-1'>
                      <h1 className='text-lg text-muted-foreground font-bold'>Win Rate</h1>
                      <h1 className='text-4xl font-bold'>{Math.round(winRate || 0)}%</h1> 
                    </div>
                    </div>
                  </div>
            )
            :
            <div className='flex flex-col gap-4 justify-center items-center flex-grow pl-15 p-10 border-2 border-dashed rounded-lg'>
              <h1 className='text-xl text-center text-muted-foreground'>No Player Details Found For The Year</h1>
            </div>
          }

        </div>  

      </div>
      
      <div className='flex flex-col gap-5 pb-10'>
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Agent Pool</CardTitle>
            </CardHeader>
            <CardContent >
              {
                agents?(
                  <AgentPool agents={agents}/>
                )
                :
                <p className="text-muted-foreground">No recent match details.</p>
              }
            </CardContent>
          </Card>
        </div>

        <div id="playerMatchDetails" className="">
          <Card>
            <CardHeader>
              <CardTitle>Map Pool</CardTitle>
            </CardHeader>
            <CardContent>
            {
                maps?(
                  <MapPool maps={maps}/>
                )
                :
                <p className="text-muted-foreground">No recent match details.</p>
              }
            </CardContent>
          </Card>
        </div>    

        <div id="playerMatchDetails" className="">
          <Card>
            <CardHeader>
              <CardTitle>Matches Played</CardTitle>
            </CardHeader>
            <CardContent>
            {
              matches && matches.length > 0 ? (
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center'>
                  {matches
                  .sort((a, b) => new Date(b[Object.keys(b)[0]].dateTime).getTime() - new Date(a[Object.keys(a)[0]].dateTime).getTime())
                  .map((match: any, index: number) => {
                    const matchDetails = match[Object.keys(match)[0]];
                    return (
                    <li key={index}>
                      <MatchCard 
                      datetime={new Date(matchDetails.dateTime).toLocaleDateString()}
                      rounds={matchDetails.totalRounds}
                      home={player.team}
                      team1={matchDetails.teams[0]}
                      team2={matchDetails.teams[1]}
                      winner={matchDetails.winner} 
                      logo1={logos.find((logo) => logo.team === matchDetails.teams[0])?.light_logo_url}
                      logo2={logos.find((logo) => logo.team === matchDetails.teams[1])?.light_logo_url}
                      />
                    </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-muted-foreground">No recent match details.</p>
              )
            }
            </CardContent>
          </Card>
        </div> 
      </div>         
    </div>
  );
}

function TeamLogo({ src, alt }: { src: string; alt: string;}) {
  return (
      <Image src={src} alt={alt} width={100} height={100} className="rounded-full"/>
  )
}