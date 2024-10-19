import Image from "next/image";
import { CardSpotlight } from "./ui/card-spotlight";

export interface FeedbackCardProps {
  avatar: string;
  name: string;
  email: string;
  comment: string;
}

export function FeedbackCard({ avatar, name, email, comment }: FeedbackCardProps) {
  return (
    <CardSpotlight className="lg:h-56 w-30 px-10 dark:bg-black dark:shadow-accent bg-accent shadow-md shadow-muted-foreground border-0">
        <div className="flex flex-row gap-4 relative z-20">
            <Image src={`/avatar/${avatar}`} width={60} height={10} alt="avatar" className="rounded-md"></Image>
            <div className="flex flex-col gap-1">
                <p className="text-xl font-bold mt-2 dark:text-white text-accent-foreground break-words truncate max-w-xs">
                  {name}
                </p>
                <p className="text-xs font-thin text-muted-foreground overflow-hidden truncate max-w-32">
                  {email}
                </p>
            </div>
        </div>

      <div className="dark:text-neutral-200 pt-6 relative z-20 text-muted-foreground break-words break-before-right">
        {comment}
      </div>
    </CardSpotlight>
  );
}
