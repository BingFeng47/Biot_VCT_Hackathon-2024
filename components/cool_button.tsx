import { Button } from "@/components/ui/button";
import { CoolMode } from "./ui/cool-mode";
 
export function CoolButton({onclick}: any) {
  return (
    <div className="relative justify-center">
      <CoolMode>
        <Button className="dark:bg-accent bg-destructive" onClick={onclick}>Submit</Button>
      </CoolMode>
    </div>
  );
}