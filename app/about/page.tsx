'use client'
import Timeline from '@/components/timeline'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

export default function AboutPage() {

    return (
    <div className="flex flex-col min-h-screen">

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-muted-foreground mb-8">About Us</h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-center text-muted-foreground">
            We are a passionate team dedicated to creating innovative solutions that make a difference. 
            Our diverse skills and shared vision drive us to excel in everything we do.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 px-18">
          <Card >
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                  <Image
                    src="/about/puff.png"
                    alt="Calvin Koay"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 className="text-5xl font-semibold mb-2">Calvin Koay</h2>
                <caption className='text-sm -mt-2 pb-3 text-muted-foreground'>rjhong_92@hotmail.com</caption>
                <p className="text-muted-foreground mb-4">Designer</p>
                <p className="text-center">
                  Calvin brings over 10 years of industry experience and a passion for innovation. 
                  His leadership drives our team to push boundaries and achieve excellence.
                </p>
              </div>
            </CardContent>
          </Card>
  
         
          <Card>
            <CardContent className="p-10">
                <div className="flex flex-col items-center">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                    <Image
                        src="/about/pokemon2.png"
                        alt="Bing Feng"
                        layout="fill"
                        objectFit="contain"
                    />
                    </div>
                    <h2 className="text-5xl font-semibold mb-2">Bing Feng</h2>
                    <caption className='text-sm -mt-1 pb-3 text-muted-foreground'>limbingfeng000407@gmail.com</caption>
                    <p className="text-muted-foreground mb-4">Developer</p>
                    <p className="text-center">
                    Bing is a tech visionary with a knack for solving complex problems. 
                    His expertise in cutting-edge technologies keeps us at the forefront of innovation.
                    </p>
                </div>
            </CardContent>
          </Card>
        </div>
        <Timeline/>
      </div>
    </div>
    )
  }