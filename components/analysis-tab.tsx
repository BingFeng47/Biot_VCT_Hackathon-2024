import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import TeamRoles from "./ui/team-roles"
import { TeamRadar } from "./team-radar"
import { TeamScore } from "./team-score"
import { MapAnalysis } from "./map-analysis"

export function AnalysisTab({ players }: any) {
  
  const supabase = createClientComponentClient();
  const [playerRoles, setPlayerRoles] = useState<any[]>([]);
  const [playersData, setPlayersData] = useState<any[]>([]);
  
  
  useEffect(() => {
    const fetchPlayerRoles = async () => {
      try {
        const playerDetails = await Promise.all(players.map(async (player:any) => {
          const { data, error } = await supabase
            .from('aws-query-data')
            .select('primary_role')
            .eq('player_name', player.player_name.trim())
            .limit(1) // Get only the latest row
            .single();

          if (error) {
            console.error(`Error fetching role for player ${player.player_name}:`, error);
            return null;
          }
            return data.primary_role;
        }));

        return playerDetails;
      } catch (error) {
        console.error("Error in fetchPlayerRoles:", error);
        return [];
      }
    };

    fetchPlayerRoles().then((roles) => {
      setPlayerRoles(roles.filter((role) => role !== null));
    });


    const fetchPlayer = async () => {
  let allPlayerDetails: any[] = [];
  let detailsError = null;
  const seenPlayers = new Set(); // To track unique player names

  try {
    const fetchDetails = async (table: any, year: string) => {
      const playerDetails = await Promise.all(players.map(async (player: any) => {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('player_name', player.player_name.trim())
          .eq('year', year)
          .limit(1)
          .single();

        return { data, error };
      }));

      return playerDetails;
    };

    const tables = ['international-player-details', 'challengers-player-details', 'game-changer-player-details'];
    const years = ['2024', '2023', '2022'];

    for (const table of tables) {
      for (const year of years) {
        const result = await fetchDetails(table, year);

        // Collecting valid data and errors
        const validDetails = result.filter(detail => detail.data);
        const errors = result.filter(detail => detail.error);

        // Add only unique players
        validDetails.forEach(detail => {
          if (detail.data && !seenPlayers.has(detail.data.player_name)) {
            seenPlayers.add(detail.data.player_name); // Mark player as seen
            allPlayerDetails.push(detail.data); // Add player details
          }
        });

        if (errors.length > 0) {
          detailsError = errors[0]; // Capture the first error
        }

        // Break if we have found valid data
        if (allPlayerDetails.length > 0) break;
      }
      // Break if we have found valid data
      if (allPlayerDetails.length > 0) break;
    }

    // Update the state only if we have player details
    if (allPlayerDetails.length > 0) {
      setPlayersData((prevData) => [...prevData, ...allPlayerDetails]); // Use spread to append all details
    }

  } catch (error) {
    console.error("Error in fetchPlayer:", error);
  }
};

// Call the function
fetchPlayer();
    
  }, [players]);



  return (
    <Tabs defaultValue="team" className="w-full mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="team" className="font-bold">Team</TabsTrigger>
        <TabsTrigger value="map" className="font-bold">Map</TabsTrigger>
      </TabsList>

      {/* Team */}
      <TabsContent value="team">
        <Card className="min-w-96">
          <CardHeader>
            <CardTitle>Team Statistics</CardTitle>
            <CardDescription>
              Overall most recent performance of all players in the team, you may add or remove any players.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full">
              <TeamRoles roles={playerRoles} />
              <div className="flex flex-row gap-4">
                <TeamRadar roles={playerRoles}/>
                <TeamScore playerDetails={playersData}/>
              </div>
            </div>
          </CardContent>
          <div className="text-right text-muted-foreground px-2 text-xs py-1">
            Last Update: {new Date().toLocaleString()}
          </div>
        </Card>
      </TabsContent>


      {/* Map */}
      <TabsContent value="map">
        <Card>
          <CardHeader>
            <CardTitle>Map Analysis</CardTitle>
            <CardDescription>
            Gain insights into team performance across different maps.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <MapAnalysis playerDetails={playersData}/>
          </CardContent>
            <div className="text-right text-muted-foreground px-2 py-1 text-xs">
              Last Update: {new Date().toLocaleString()}
            </div>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
