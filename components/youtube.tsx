import HeroVideoDialog from "./ui/hero-video-dialog";

export function Youtube() {
  return (
    <div className="">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/tYzUEahg3R4"
        thumbnailSrc="/docs/biot-cover.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/tYzUEahg3R4"
        thumbnailSrc="/docs/biot-cover.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
