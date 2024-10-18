import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeButton } from "@/components/theme_button";
import { BookText, Bot, BotMessageSquare, Github, Youtube } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import Link from "next/link";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Biot",
  description: "Unleash the power of AI to find the best team compositions and player insights for competitive Valorant",
  icons: {
    icon: '/bot.svg', // Specify the path to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      

      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        {/* Header */}
        <header className="px-4 lg:px-6 h-20 flex items-center sticky top-0 z-50 bg-background pt-1">
        
          {/* Logo */}
          <a className="flex items-center justify-center" href="/">
            <Bot className="h-8 w-8" />
          </a>
          
          {/* Nav Items */}
          <nav className="ml-auto flex gap-2 lg:gap-4 items-center">
            
            
            <Link href={"/chatbot"}>
              <Button variant= {"outline"} className="lg:text-sm py-5">
                AI Team Builder
              </Button>
            </Link>

            <Link href={"/players"}>
              <Button variant= {"outline"} className="lg:text-sm py-5">
                Players
              </Button>
            </Link>

            <Link href={"/about"}>
              <Button variant= {"outline"} className="lg:text-sm py-5">
                About Us
              </Button>
            </Link>

            <Link href={"/docs"}>
              <Button variant= {"outline"} className="lg:text-sm py-5">
                Docs
              </Button>
            </Link>

            <Link href={"/feedback"}>
              <Button variant= {"outline"} className="text-lg py-5">
                <BotMessageSquare strokeWidth={1.5}></BotMessageSquare>
              </Button>
            </Link>

            <ThemeButton/>
          </nav>

        </header>

        {children}

        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 Biot VCT Hackathon. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <a className="text-xs hover:underline underline-offset-4" href="/docs">
              <BookText/>
            </a>
            <a className="text-xs hover:underline underline-offset-4" href="#">
              <Github />
            </a>
            <a className="text-xs hover:underline underline-offset-4" href="/docs">
              <Youtube />
            </a>
          </nav>
        </footer>
      </ThemeProvider>

      </body>
    </html>
  );
}
