"use client";

import React, { useEffect, useState } from 'react'

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoonIcon, SunIcon } from "lucide-react";

function ModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme,setTheme } = useTheme();
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }

  return (
    <div>
      <title>Theme</title>
      <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Set Theme</CardTitle>
        <CardDescription>Pick your theme</CardDescription>
      </CardHeader>
      <CardContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ringHover" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")} className={`${theme == 'light' ? 'bg-zinc-300' : ''}`}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className={`${theme == 'dark' ? 'bg-zinc-300' : ''}`}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className={`${theme == 'system' ? 'bg-zinc-300' : ''}`}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
      {/* <CardFooter className="border-t px-6 py-4">
        <Button>Save</Button>
      </CardFooter> */}
    </Card>
    </div>
    
  );
}
export default ModeToggle;
