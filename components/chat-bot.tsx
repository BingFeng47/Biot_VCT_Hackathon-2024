import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Loader, Loader2, LoaderPinwheel } from 'lucide-react';
import MarkdownRenderer from './md';
import { Input } from './ui/input';
import { Button } from './ui/button';
import ChatBubble from './chat-bubble';

function ChatBot({loading, response, inputValue, setInputValue, onSubmit, onDemo}: any) {
    return (
        // Chat Section
        <div className="min-w-screen text-sm">
            <Card className="min-w-screen">
                <CardHeader className='flex flex-row items-center justify-between'>
                    <CardTitle>Biot Team Builder</CardTitle>
                    <Button variant={'destructive'} onClick={onDemo}>Demo</Button>
                </CardHeader>
                
                <CardContent className="min-w-screen">
                    <ScrollArea className="h-[calc(100vh-245px)] overflow-auto">
                        <ChatBubble chat={response} />
                    </ScrollArea>
                    
                    <div className="flex mt-2">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 mr-2"
                            onKeyDown={(e) => {e.key === 'Enter' && onSubmit()}}
                        />
                        {
                            loading ?
                            <Button disabled ><Loader2 className='animate-spin'/></Button>
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