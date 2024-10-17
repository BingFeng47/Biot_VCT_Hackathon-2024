'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CoolButton } from "../cool_button"
import {  createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react"
import AgentDrawer from "../agent_drawer"
import { Loader } from "lucide-react"


export function AddComment() {
  
 // State variables for input fields
 const [avatar, setAvatar] = useState('sova.png'); 
 const [name, setName] = useState(''); 
 const [email, setEmail] = useState(''); 
 const [comment, setComment] = useState(''); 
 const [loading, setLoading] = useState(false);

 // Initialize Supabase client
 const supabase = createPagesBrowserClient(); // Use browser client instead

  // Handle selected avatar from AgentDrawer
  const handleAvatar = (avatar: string) => {
    setAvatar(avatar);
  }

 // Handle form submission
 const handleSubmit = async () => {
    setLoading(true);
    // Validate input fields
    if (!name || !email || !comment) {
      return;
    }

   // Insert user input into Supabase
   const { data, error } = await supabase.from("feedback").insert({
     avatar: avatar, // Assuming you want to keep the avatar static
     name: name, 
     email: email, 
     comment: comment
   });

   if (error) {
     console.error("Error inserting comment:", error);
     setLoading(false);
     // Optionally, you can handle the error (e.g., show a notification)
   } else {
     setAvatar(avatar);
     setName('');
     setEmail('');
     setComment('');
     window.location.reload();
   }
 }

  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button variant="destructive" size={"icon"} className="text-3xl font-bold rounded-lg shadow-muted shadow-sm p-7">+</Button>
      </DialogTrigger>
      {
          !loading?
      <DialogContent className="sm:max-w-[425px] lg:max-w-[800px]">
        
        <DialogHeader>
          <DialogTitle>Leave A Comment</DialogTitle>
          <DialogDescription className="py-2">
            This messsage will be visible to others as well. You will not be able to edit the message after submitting. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="flex sm:flex-row flex-col gap-8">
          {/* Agent */}
          <AgentDrawer avatar={avatar} handleAvatar={handleAvatar}/>
        {/* Input */}
        <div className="flex flex-col gap-3 w-full">
            <div className="w-full">
              <div className="flex flex-row mb-2 justify-between">
                <Label className="">
                  Name
                </Label>
                {!name && <span className="text-red-500 text-xs">Name is required</span>}
              </div>
           
            <Input
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full"
              maxLength={25}
            />
          </div>
          <div className="w-full">
          <div className="flex flex-row mb-2 justify-between">
              <Label className="">
                Email
              </Label>
              {!email && <span className="text-red-500 text-xs">Email is required</span>}
            </div>
            <Input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full"
              maxLength={50}
            />
          </div>
          <div className="w-full">
          <div className="flex flex-row mb-2 justify-between">
              <Label className="">
                Comment (150 characters)
              </Label>
              {!comment && <span className="text-red-500 text-xs">Comment is required</span>}
            </div>
            <Textarea
              id="comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="w-full"
              maxLength={150}
              rows={5}
            />
          </div>
        </div>
      </div>
        
        <DialogFooter>
            <CoolButton onclick={handleSubmit}/>
        </DialogFooter>
      </DialogContent>
      :
      <DialogContent>
        <div className="flex justify-center items-center">
        <Loader className="animate-spin" />
        </div>
      </DialogContent>
      }
    </Dialog>
  )
}
