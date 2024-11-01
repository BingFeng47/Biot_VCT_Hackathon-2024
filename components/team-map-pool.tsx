import Image from 'next/image';
import React from 'react';

interface Map {
    mapName: string;
    numberOfPlays: number;
    numberOfWins: number;
    winRate: number;
}

interface MapPoolProps {
    maps: { [key: string]: Map }[];
}

function TeamMapPool({ maps }: MapPoolProps) {
    return (
        <div className='grid xs:grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-center'>
            {maps.map((Map, index) => {
                const mapName = Object.keys(Map)[0];
                const { numberOfPlays, numberOfWins, winRate } = Map[mapName];
                return (
                        <div key={index} className='flex flex-row pb-8 gap-4'>
                            <div className='flex flex-col items-center font-bold text-lg text-accent-foreground gap-1'>
                                
                            <Image 
                                        src={`/map/${mapName.toLowerCase()}.png`} 
                                        width={window.innerWidth < 640 ? 100 : 220} 
                                        height={window.innerWidth < 640 ? 100 : 220} 
                                        alt={mapName} 
                                        className='rounded-sm'
                                    />
                            </div>
                            <div className='flex flex-col justify-center'>
                                <div className='font-bold pb-2 text-2xl text-accent-foreground'>{mapName}</div>
                                <div className='text-muted-foreground'>Plays: {numberOfPlays}</div>
                                <div className='text-muted-foreground'>Wins: {numberOfWins}</div>
                                <div className='text-muted-foreground'>Win Rate: {Math.round(winRate)}%</div>
                            </div>
                        </div>
                );
            })}
        </div>
    );
}

export default TeamMapPool;
