import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from '@radix-ui/react-scroll-area';

function ChatTeam() {
  return (
    <div className='w-1/3'>
        {/* Team Players Section */}
        <Card className=" bg-transparent">
            <CardHeader>
            <CardTitle>Your Team</CardTitle>
            </CardHeader>
            <CardContent>
            <ScrollArea className="h-[calc(100vh-200px)]">
            {/* {players.map((player, index) => (
                <div key={index} className="flex items-center mb-4">
                <Avatar className="h-10 w-10">
                <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={player} />
                <AvatarFallback>{player.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="ml-4">{player}</span>
                </div>
            ))} */}
            </ScrollArea>
            </CardContent>
            </Card>
    </div>
    
  )
}

export default ChatTeam