import Link from "next/link";
import { GlareCard } from "./ui/glare-card";

export function LeagueCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-10 sm:pb-10 lg:gap-20">
        <Link href='/players/game-changer' className="flex flex-col align-middle justify-center items-center hover:cursor-pointer">
            <GlareCard className="flex flex-col items-center justify-center">
                <img
                    className="object-cover p-2"
                    src="/league/gc.png"
                    />
            </GlareCard>
            <h1 className=" text-lg lg:text-xl font-bold text-accent-foreground pt-6">GAME CHANGERS</h1>
        </Link>


        <Link href='/players/challenger' className="flex flex-col align-middle justify-center items-center hover:cursor-pointer">
            <GlareCard className="flex flex-col items-center justify-center">
                <img
                    className="object-contains p-2 lg:w-42 lg:h-42"
                    src="/league/challenger.png"
                    />
            </GlareCard>
            <h1 className="text-lg lg:text-xl font-bold text-accent-foreground pt-6">CHALLENGERS</h1>
        </Link>

        <Link href='/players/international' className="flex flex-col align-middle justify-center items-center hover:cursor-pointer">
            <GlareCard className="flex flex-col items-center justify-center">
                <img
                    className="p-14"
                    src="/league/master.png"
                    />
            </GlareCard>
            <h1 className="text-lg lg:text-xl font-bold text-accent-foreground pt-6">INTERNATIONAL</h1>
        </Link>
      
    </div>
  );
}
