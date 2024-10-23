import HeroVideoDialog from "./ui/hero-video-dialog";

export function Youtube() {
  return (
    <div className="">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/watch?v=PQJ-bKCpuZk"
        thumbnailSrc="/docs/hero.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/watch?v=PQJ-bKCpuZk"
        thumbnailSrc="/docs/hero.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
