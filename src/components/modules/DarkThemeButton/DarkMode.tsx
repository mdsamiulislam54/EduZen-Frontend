"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger


        className="
          flex items-center justify-center
          cursor-pointer
            relative size-9 rounded-xl
            border-border/60
            bg-background/80
            shadow-sm
            transition-all duration-200
            hover:border-primary/30
            hover:bg-primary/5
            focus-visible:ring-2
            focus-visible:ring-primary/30
          "
      >
        {/* Light */}
        <Sun
          className="
              
              rotate-0 scale-100
              transition-all duration-300
              dark:-rotate-90 dark:scale-0
            "
          size={17}
        />

        {/* Dark */}
        <Moon
          className="
              absolute 
              rotate-90 scale-0
              transition-all duration-300
              dark:rotate-0 dark:scale-100
            "
          size={17}
        />

        <span className="sr-only">Toggle theme</span>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-44 rounded-xl border-border/60 p-1.5 shadow-xl"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer rounded-lg px-3 py-2.5"
        >
          <Sun className="mr-2 size-4 text-amber-500" />

          <span className="flex-1">Light</span>

          {theme === "light" && (
            <Check className="size-4 text-primary" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer rounded-lg px-3 py-2.5"
        >
          <Moon className="mr-2 size-4 text-blue-400" />

          <span className="flex-1">Dark</span>

          {theme === "dark" && (
            <Check className="size-4 text-primary" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer rounded-lg px-3 py-2.5"
        >
          <Monitor className="mr-2 size-4 text-muted-foreground" />

          <span className="flex-1">System</span>

          {theme === "system" && (
            <Check className="size-4 text-primary" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}