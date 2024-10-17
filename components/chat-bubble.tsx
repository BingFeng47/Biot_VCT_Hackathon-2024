import { Bot, Cat } from 'lucide-react'
import React from 'react'
import MarkdownRenderer from './md'

function ChatBubble({chat}:any) {
  return (
    <div>
        <div className="flex flex-col justify-start items-start w-full gap-6">

            {chat.map((message: { avatar: string, chat: string }, index: number) => (
                <div key={index} className="flex flex-col ">
                    <div className="w-8 h-8">
                        {
                            message.avatar === 'bot' ?
                            <Bot />
                            :
                            <Cat />
                        }
                    </div>
                    <div className="bg-accent p-4 rounded-lg">
                        <MarkdownRenderer markdown={message.chat} />
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChatBubble