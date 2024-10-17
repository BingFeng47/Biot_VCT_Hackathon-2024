import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";

export const HoverEffect = ({
  players,
  className,
}: {
  players: {
    id: string;
    photo_url: string;
    handle: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {players!.map((player) => (
            <div key={player.id} className=" h-[200px] flex flex-col items-center p-2 bg-muted rounded-lg">
                <Suspense fallback={<div className='text-6xl z-50'>Loading...</div>}>
                <Image
                  src={player.photo_url && 
                  player.photo_url !== "http://static.lolesports.com/players/1643734200321_silhouette_transparent.png" && 
                  player.photo_url !== "http://static.lolesports.com/players/1675077993344_silhouette_transparent.png" && 
                  player.photo_url !== "https://s3.us-west-2.amazonaws.com/static.lolesports.com/players/default-headshot.png" ? player.photo_url : '/avatar/sage.png'}
                  alt={player.handle}
                  width={150}
                  height={150}
                  className="rounded-full"
                  loading="lazy" // This is not necessary as Next.js handles it automatically
                />
                </Suspense>
              <p className="mt-2 text-sm font-medium">{player.handle}</p>
            </div>
          ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
