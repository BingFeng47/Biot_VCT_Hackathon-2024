import { ChatInit } from '@/components/chat_init'
import { BackgroundBeams } from '@/components/ui/background-beams'
import React from 'react'

function ChatBotPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ChatInit />
      <BackgroundBeams className='-z-10'/>
    </div>

  )
}

export default ChatBotPage