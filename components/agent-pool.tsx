import Image from 'next/image';
import React from 'react';

interface Agent {
    agentRole: string;
    numberOfPlays: number;
    numberOfWins: number;
    winRate: number;
}

interface AgentPoolProps {
    agents: { [key: string]: Agent }[];
}

function AgentPool({ agents }: AgentPoolProps) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center'>
            {agents.map((agent, index) => {
                const agentName = Object.keys(agent)[0];
                const { agentRole, numberOfPlays, numberOfWins, winRate } = agent[agentName];
                return (
                        <div key={index} className='flex flex-row pb-8 gap-4 border-destructive rounded-lg '>
                            <div className='flex flex-col items-center font-bold text-lg text-accent-foreground gap-2'>
                                {agentName === 'KAY/O' ? (
                                    <Image 
                                        src={`/avatar/kayo.png`} 
                                        width={window.innerWidth < 640 ? 50 : 150} 
                                        height={window.innerWidth < 640 ? 50 : 150}  
                                        alt={agentName} 
                                        className='rounded-sm'

                                    />
                                ) : (
                                    <Image 
                                        src={`/avatar/${agentName.toLowerCase()}.png`} 
                                        width={window.innerWidth < 640 ? 100 : 150} 
                                        height={window.innerWidth < 640 ? 100 : 150} 
                                        alt={agentName} 
                                        className='rounded-sm'
                                    />
                                )}
                            </div>
                            <div className='flex flex-col justify-center text-xl'>
                                <div className='font-bold pb-2 text-2xl text-accent-foreground'>{agentName}</div>
                                <div >Role: {agentRole}</div>
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

export default AgentPool;
