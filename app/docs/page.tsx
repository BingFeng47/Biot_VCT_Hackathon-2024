'use client'
import { Youtube } from '@/components/youtube'
import React from 'react'

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen items-center gap-10">
      <div className='pb-10'></div>
      <h1 className="sm:text-4xl font-bold text-center mb-5 text-2xl text-muted-foreground">Documentation</h1>
      <div className='px-52 w-3/4'>
        <Youtube/>
      </div>
    </div>

  )
}
