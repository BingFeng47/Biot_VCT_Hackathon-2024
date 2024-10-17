'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Frown, Sandwich, Search } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { PostgrestError } from '@supabase/supabase-js';

export default function InternationalPlayerPage() {
  const supabase = createClientComponentClient();

  interface Player {
    id: number;
    handle: string;
    photo_url: string;
    acronym: string;
  }

  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<PostgrestError | null>(null);
  

  const handleSearch = async (searchValue:any) => {
    setSearch(searchValue)

    if (searchValue === "") {
      const { data, error } = await supabase
        .from("international-players")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        setError(error);
      } else {
        setPlayers(data || []);
      }
    } else {
      const { data, error } = await supabase
        .from("international-players")
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
  }, []); // Empty dependency array ensures it runs only once


  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col min-h-screen px-20">

      <div className='flex flex-row justify-between w-full'>

        <div className="flex justify-start pt-10 pb-10">
          <h1 className="sm:text-4xl font-bold text-2xl text-muted-foreground">International Players</h1>
        </div>

        <div className="flex justify-end pt-10 pb-10">
          <input type="text" placeholder="Search player by name" className="border-2 rounded-lg pl-5 min-w-full" onChange={(e) => handleSearch(e.target.value)} value={search}></input>
          <Button variant='destructive' className='mx-2' onClick={()=>handleSearch(search)}><Search></Search></Button>
        </div>

      </div>
        {/* Players */}
        {players.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-6 gap-6 pb-10">
            {players.map((player) => (
            <Link href={`/players/international/${String(player.id)}`} key={player.id} className="h-72 flex flex-col  items-center bg-accent rounded-sm shadow-lg shadow-muted-foreground dark:shadow-black">
            <Image
              src={player.photo_url && 
              player.photo_url !== "http://static.lolesports.com/players/1643734200321_silhouette_transparent.png" && 
              player.photo_url !== "http://static.lolesports.com/players/1675077993344_silhouette_transparent.png" && 
              player.photo_url !== "https://lolstatic-a.akamaihd.net/esports-assets/production/player/zerost-4v5o369r.png" && 
              player.photo_url !== "https://s3.us-west-2.amazonaws.com/static.lolesports.com/players/default-headshot.png" ? `${player.photo_url}` : "https://lolstatic-a.akamaihd.net/esports-assets/production/player/aslan-7nd6ux13.png?w=50&h=50&fit=crop"}
              alt={player.handle}
              width={200}
              height={200}
              className="w-full overflow-hidden object-cover rounded-sm flex-2"
              loading="lazy"
            />
              <div className='text-center py-3'>
                <p className="text-2xl font-bold text-accent-foreground flex-1 ">{player.handle}</p>
                <p className='text-xs text-destructive font-bold'>{player.acronym}</p>
              </div>
              
            </Link>
            ))}

          </div>

        ) : (
          <div className=' flex flex-col items-center p-20 gap-5'>
            <Frown size={66} className="text-muted-foreground" />
            <h2 className="text-2xl text-muted-foreground">Opps, no player found... </h2>
          </div>
        )}      
    </div>
  </div>
  )
}
