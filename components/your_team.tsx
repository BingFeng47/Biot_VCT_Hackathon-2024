import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

function YourTeam({id,tier,image,player_name, first_name, last_name, team, acronym, dark_logo_url, light_logo_url}:any) {
  return (
    <div className='w-full'>
        <Link href={`/players/${tier}/${id}`} target="_blank">
        <div className="flex flex-row gap-2 items-center border rounded-lg border-accent overflow-auto px-3 ">
            
            <div className='flex h-32 w-32 flex-1 items-center justify-center '>
            <Image  src={image && 
              image !== "http://static.lolesports.com/players/1643734200321_silhouette_transparent.png" && 
              image !== "http://static.lolesports.com/players/1675077993344_silhouette_transparent.png" && 
              image !== "https://lolstatic-a.akamaihd.net/esports-assets/production/player/zerost-4v5o369r.png" && 
              image !== "https://static.lolesports.com/players/1678371423205_silhouette_transparent.png" && 
              image !== "https://s3.us-west-2.amazonaws.com/static.lolesports.com/players/default-headshot.png" ? `${image}` 
              : "https://lolstatic-a.akamaihd.net/esports-assets/production/player/aslan-7nd6ux13.png?w=50&h=50&fit=crop"} 
              alt="player_image"  width={200} height={200} className='rounded-lg object-contain'/>
            </div>

            <div className='flex flex-col gap-2 w-1/2 text-xs'>
            <div className='flex flex-row items-center gap-2'>
                <div>
                <div className='bg-accent rounded-full'>
                <Image src={dark_logo_url} alt="logo" width={40} height={40} className='p-1 object-center'/>
                </div>
                </div>
                <h1 className='text-xs font-bold'>{player_name}</h1> 
            </div>
            <Button variant="destructive" className='text-xs font-bold mt-2'>View Player</Button>
            
            </div>
        </div>
        </Link>
    </div>
  )
}

export default YourTeam