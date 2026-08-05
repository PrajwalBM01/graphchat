"use client"
import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "./ui/sidebar"
import { Mouse, Touchpad } from "lucide-react"
import { useCanvasStore } from "@/store/canvasStore"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import {
  BotMessageSquare,
  Bug,
  Globe,
  Monitor,
  Moon,
  Sun,
  Text,
  Type,
} from "lucide-react"
import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const themeIcons = {
  light: <Sun />,
  dark: <Moon />,
  system: <Monitor />,
}

const RightSidebar = () => {
  const { isMouse, setIsMouse } = useCanvasStore()
  const { theme, setTheme, themes } = useTheme()
  const router = useRouter()
  return (
    <Sidebar side="right" variant="floating">
      <SidebarHeader>
        <SidebarTrigger className="" />
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 p-2">
        <div className="flex flex-col gap-2">
          <h1>Controls</h1>
          <div className="flex gap-2">
            <div
              onClick={() => setIsMouse(true)}
              className={cn(
                "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition-colors duration-200 hover:border-primary",
                isMouse ? "border-none bg-accent" : "border-accent"
              )}
            >
              <Mouse strokeWidth={1.5} />
              <p>Mouse</p>
            </div>
            <div
              onClick={() => setIsMouse(false)}
              className={cn(
                "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition-colors duration-200 hover:border-primary",
                !isMouse ? "border-none bg-accent" : "border-accent"
              )}
            >
              <Touchpad strokeWidth={1.5} />
              <p>Touchpad</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Themes</h1>
          <div className="">
            {themes.map((t) => (
              <Button
                onClick={() => setTheme(t)}
                disabled={theme === t}
                className={cn("bg-accent text-foreground hover:bg-card")}
                key={t}
              >
                {themeIcons[t as keyof typeof themeIcons]}
              </Button>
            ))}
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={async () =>
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => router.push("/signin"),
              },
            })
          }
        >
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default RightSidebar
