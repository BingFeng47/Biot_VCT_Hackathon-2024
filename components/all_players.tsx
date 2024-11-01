import * as React from "react"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestError } from "@supabase/supabase-js"
import Image from "next/image"
import { Frown, Search } from "lucide-react"
import { ScrollArea } from "@radix-ui/react-scroll-area"

export function AllPlayers({ addPlayer }: { addPlayer: (playerName: string) => void }) {

  const supabase = createClientComponentClient();

  interface Player {
    id: number;
    handle: string;
    photo_url: string;
    acronym: string;
    player_name: string;
    tier: string;
  }

  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<PostgrestError | null>(null);
  

  const handleSearch = async (searchValue: any) => {
    setSearch(searchValue)

    if (searchValue === "") {
      const { data, error } = await supabase
        .from("all_players")
        .select("*")
        .order("tier", { ascending: false });

      if (error) {
        setError(error);
      } else {
        setPlayers(data || []);
      }
    } else {
      const { data, error } = await supabase
        .from("all_players")
        .select("*")
        .or(`handle.ilike.%${search}%,acronym.ilike.%${search}%`)
        .order("id", { ascending: true });

      if (error) {
        setError(error);
      } else {
        setPlayers(data || []);
      }
    }
  };

  // Call handleSearch once on initial render
  useEffect(() => {
    handleSearch(search);
  }, []); 
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Player</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <div className="mx-auto w-full ">
          <DrawerHeader className="flex flex-row px-10 items-center justify-between">
        <DrawerTitle>All Players</DrawerTitle>
        <DrawerDescription></DrawerDescription>
        <div className="flex justify-end ">
        <input type="text" placeholder="Search player by name" className="border-2 rounded-lg pl-5 min-w-full" onChange={(e) => handleSearch(e.target.value)} value={search}></input>
        <Button variant='destructive' className='mx-2' onClick={()=>handleSearch(search)}><Search width={16}></Search></Button>
          </div>
          </DrawerHeader>
          
          {players.length > 0 ? (
        <ScrollArea  className="h-[calc(100vh-200px)] px-10 overflow-auto ">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 2xl:grid-cols-10 gap-6 pb-10">
            {players.map((player) => (
            <div className=" flex flex-col  items-center bg-accent rounded-sm shadow-lg shadow-muted-foreground dark:shadow-black">
            <Image
          src={
            "/placeholder/placeholder_man.png"
            }
          alt={player.handle}
          width={50}
          height={50}
          className="w-full overflow-hidden object-cover rounded-sm flex-2"
          loading="lazy"
            />
          <div className='text-center py-3'>
            <p className="text-sm font-bold text-accent-foreground flex-1 ">{player.player_name}</p>
            <p className='text-xs text-destructive font-bold'>{player.tier.charAt(0).toUpperCase() + player.tier.slice(1)}</p>
            <Button variant="outline" className="text-xs m-2" onClick={() => (addPlayer(player.player_name))}>
              <PlusIcon className="mr-2" /> Add
            </Button>
          </div>
          
            </div>
            ))}

          </div>
        </ScrollArea>

        ) : (
          <div className=' flex flex-col items-center p-20 gap-5'>
        <Frown size={66} className="text-muted-foreground" />
        <h2 className="text-2xl text-muted-foreground">Opps, no player found... </h2>
          </div>
        )}   

          <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">Done</Button>
        </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
