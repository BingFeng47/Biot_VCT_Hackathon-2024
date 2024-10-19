import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Loader, LoaderPinwheel } from 'lucide-react';
import MarkdownRenderer from './md';
import { Input } from './ui/input';
import { Button } from './ui/button';
import ChatBubble from './chat-bubble';

function ChatBot({loading, response, inputValue, setInputValue, onSubmit}:any) {
  return (
    // Chat Section
    <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col bg-transparent text-xs">
        <CardHeader>
            <CardTitle>Biot Team Builder</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
     
            <ScrollArea className="flex-1 max-h-[700px] overflow-auto">
                <ChatBubble chat={response} />
            </ScrollArea>
            
            <div className="flex mt-10">
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 mr-2"
                onKeyDown={(e) => {e.key === 'Enter' && onSubmit()}}
            />
            {
                loading?
                <Button disabled ><LoaderPinwheel className='animate-spin'/></Button>
                :
                <Button onClick={onSubmit} disabled={!inputValue.trim()}>Send</Button>
            }
                
            </div>
        </CardContent>
        </Card>
  </div>
  )
}

export default ChatBot