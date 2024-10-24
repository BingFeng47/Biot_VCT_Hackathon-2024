import { FeedbackCard } from '@/components/feedback_card'
import { AddComment } from '@/components/ui/add_comment'
import { cookies } from 'next/headers';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import React from 'react'

export default async function FeedbackPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  const { data: feedback, error } = await supabase.from("feedback").select("*"); 

  return (
    <div className="flex flex-col min-h-screen">
      <div className='pb-10'></div>
        <h1 className="sm:text-4xl font-bold text-center mb-10 text-2xl text-muted-foreground">We'd Like To Hear From You!</h1>

        <div className='lg:px-20 lg:mx-15 sm:px-10  px-10'>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-center pb-8">
            {feedback!.map((feedback, index) => (
              <FeedbackCard key={index} avatar={feedback.avatar} name={feedback.name}  email={feedback.email} comment={feedback.comment}/>
            ))}
          </div>
        </div>
        <div className='fixed bottom-20 right-16'>
          <AddComment/>
        </div>
    </div>

  )
}
