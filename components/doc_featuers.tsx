import { BookText, Bot, BotMessageSquare, Gamepad2, Ghost, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "./ui/bento-grid";
import Image from "next/image";


const features = [
  {
    Icon: Bot,
    name: "Biot",
    description: "AI Team Builder",
    href: "./",
    cta: "Biot",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div></div>
      // <div className={cn(
      //   "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
      //   "relative"
      // )}>
      //   <Image
      //     src="/feature/players-light.png"
      //     alt="Valorant"
      //     width={400}
      //     height={400}
      //     className="absolute dark:hidden object-contain"
      //     style={{ maskImage: "linear-gradient(to top, transparent, black)" }}
      //   />
      //   <Image
      //     src="/feature/players-dark.png"
      //     alt="Valorant"
      //     width={400}
      //     height={400}
      //     className="absolute hidden dark:block object-contain"
      //     style={{ maskImage: "linear-gradient(to top, transparent, black)" }}
      //   />
      // </div>
    ),
  },
  {
    Icon: Github,
    name: "Github",
    description: "Find the code on Github",
    href: "https://github.com/BingFeng47/Biot_VCT_Hackathon-2024.git",
    cta: "Github",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div></div>

      // <div className={cn(
      //   "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
      //   "relative"
      // )}>
      //   <Image
      //     src="/feature/bot-light.png"
      //     alt="Valorant"
      //     width={400}
      //     height={400}
      //     className="absolute dark:hidden"
      //     style={{ maskImage: "linear-gradient(to top, transparent, black)" }}
      //   />
      //   <Image
      //     src="/feature/bot-dark.png"
      //     alt="Valorant"
      //     width={400}
      //     height={400}
      //     className="absolute hidden dark:block"
      //     style={{ maskImage: "linear-gradient(to top, transparent, black)" }}
      //   />
      // </div>
    ),
  },{
    Icon: BotMessageSquare,
    name: "Feedback",
    description: "Leave some comments",
    href: "./feedback",
    cta: "Comments",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div></div>

      // <div className={cn(
      //   "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
      //   "relative"
      // )}>
      //   <Image
      //     src="/feature/bot-light.png"
      //     alt="Valorant"
      //     width={400}
      //     height={400}
      //     className="absolute dark:hidden"
      //     style={{ maskImage: "linear-gradient(to top, transparent, black)" }}
      //   />
      //   <Image
      //     src="/feature/bot-dark.png"
      //     alt="Valorant"
      //     width={400}
      //     height={400}
      //     className="absolute hidden dark:block"
      //     style={{ maskImage: "linear-gradient(to top, transparent, black)" }}
      //   />
      // </div>
    ),
  }
];

export function DocsFeatures() {
  return (
    <BentoGrid >
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
