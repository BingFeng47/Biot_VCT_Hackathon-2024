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

function TeamAgentPool({ agents }: AgentPoolProps) {
    return (
        <div className='flex flex-row justify-around'>
            {agents
            .sort((a, b) => {
                const agentA = Object.values(a)[0];
                const agentB = Object.values(b)[0];
                return agentB.winRate - agentA.winRate;
            })
            .slice(0, 3)
            .map((agent, index) => {
                const agentName = Object.keys(agent)[0];
                return (
                <div key={index} className='flex flex-row border-destructive rounded-lg '>
                    <div className='flex flex-col items-center font-bold text-lg text-accent-foreground gap-2'>
                    {agentName === 'KAY/O' ? (
                        <div>
                        <Image 
                            src={`/avatar/kayo.png`} 
                            width={40} 
                            height={40}  
                            alt={agentName} 
                            className='rounded-full'
                        />
                        </div>
                    ) : (
                        <div>
                        <Image 
                            src={`/avatar/${agentName.toLowerCase()}.png`} 
                            width={40} 
                            height={40} 
                            alt={agentName} 
                            className='rounded-full'
                        />
                        </div>
                    )}
                    </div>
                </div>
                );
            })}
        </div>
    );
}

export default TeamAgentPool;
