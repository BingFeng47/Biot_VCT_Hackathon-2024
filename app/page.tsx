"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import SparklesText from "@/components/ui/sparkles-text"
import { Modal, ModalTrigger } from "@/components/ui/animated-modal"
import { Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import GridPattern from "@/components/ui/grid-pattern"
import { Features } from "@/components/features"
import SpecialThanks from "@/components/logo_carousel"
import Link from "next/link"

  export default function Home() {
    
      return (
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">

            {/* Hero */}
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background z-10">
              <section className="w-full py-12 md:py-24 lg:py-32 xl:py-42 z-50">
              <div className="px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center -mt-24">
                  <div className="">
                    <Bot className="lg:w-48 lg:h-48" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  <SparklesText className="lg:text-5xl" text="Welcome to Biot" sparklesCount={8} colors={{first: '#A07CFE', second: '#FE8FB5'}}/>
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-base lg:text-lg ">
                  Unleash the power of AI to find the best team compositions and player insights for competitive Valorant.
                  </p>
                  <Link href='/chatbot' className="flex flex-row lg:gap-8 gap-4 pt-5">
                  <Modal>
                    <ModalTrigger className=" text-white bg-destructive flex justify-center group/modal-btn items-center px-8 font-semibold lg:text-sm ">
                      <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                        Get Started!
                      </span>
                      <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        <Bot></Bot>
                      </div>
                    </ModalTrigger>
                  </Modal>  
                  <Button variant={"outline"} size={"lg"} className="lg:text-sm py-6 font-semibold"><Link href='#features'>Learn More</Link></Button>  
                  </Link>           
                </div>
              </div>
              </section>
              <GridPattern
              squares={[
                [4, 4],
                [5, 1],
                [8, 2],
                [5, 3],
                [5, 5],
                [10, 10],
                [12, 15],
                [15, 10],
                [10, 15],
                [15, 10],
                [22, 20],
                [20, 20],
                [27, 30],
                [22, 20],
                [28, 10],
                [30, 20],
                [35, 24],
                [2, 29],
                [53, 10],
              ]}
              className={cn(
                "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-55%] h-[210%] skew-y-12",
              )}
              />
            </div>

            {/* Top Features */}
            <section id='features' className="bg-secondary min-h-screen min-w-screen flex justify-center items-center lg:py-20">
              <div className="lg:mx-40 mx-10 xs:2 flex gap-6 flex-grow">
                <p className="lg:text-4xl font-bold flex justify-center dark:text-white">KEY FEATURES</p>
                <Features />
              </div>
            </section>

            {/* Top Features */}
            <section className="bg-muted py-20 items-center">
              <div className="">
                <p className="text-2xl lg:text-4xl font-bold flex justify-center dark:text-accent-foreground">SPECIAL THANKS</p>
                <SpecialThanks/>
              </div>
              
            </section>
          </main>

        </div>
      )
  }

