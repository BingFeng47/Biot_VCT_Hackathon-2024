import { Bot, Cat } from 'lucide-react'
import React from 'react'
import MarkdownRenderer from './md'

function ChatBubble({chat}:any) {
  return (
    <div>
        <div className="flex flex-col justify-start items-start w-full gap-4">

            {chat.map((message: { avatar: string, chat: string }, index: number) => (
                <div key={index} className="flex flex-row items-center">
                    <div className="pr-2">
                        {
                            message.avatar === 'bot' ?
                            <Bot className='w-6 h-6'/>
                            :
                            <Cat className='w-6 h-6'/>
                        }
                    </div>
                    <div className="bg-accent p-3 rounded-lg">
                        <MarkdownRenderer markdown={message.chat} />
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChatBubble