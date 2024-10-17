import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export default function AgentDrawer({ avatar, handleAvatar }: { avatar: string; handleAvatar: (agent: string) => void }) {

  const agents_images = [
    "sova.png", "phoenix.png", "jett.png", "killjoy.png", "reyna.png", "sage.png", "viper.png", "omen.png", 
    "brimstone.png", "cypher.png", "harbor.png", "iso.png", "raze.png", "breach.png", "skye.png", "yoru.png", 
    "astra.png", "kayo.png", "chamber.png", "neon.png", "deadlock.png", "fade.png", "gekko.png"
  ];


  // Function to pass back the selected agent to the parent component
  const passBackAvatar = (agentName: string) => {
    handleAvatar(agentName); // Pass data back to ParentComponent
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Image src={`/avatar/${avatar}`} width={280} height={160} alt="avatar" />
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col mx-10 rounded-xl overflow-hidden">
          <DrawerHeader className='flex justify-center'>
            <DrawerTitle>Choose Your Agent</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="">
            <div className="flex w-max space-x-4 p-4">
              {agents_images.map((agentName, index) => (
                <Button key={index} onClick={() => passBackAvatar(agentName)} className='w-full h-full bg-transparent rounded-3xl hover:bg-accent'>
                  <Image src={`/avatar/${agentName}`} width={200} height={160} alt="avatar" className='' />
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className='pt-1' />
          </ScrollArea>
          <DrawerFooter>
            {/* <Button 
              className='text-lg font-bold dark:bg-accent bg-destructive' 
            >
              Confirm
            </Button> */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
