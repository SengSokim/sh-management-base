"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/app/hooks/useProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function Setting() {
  const { profile, getProfile, updateProfile } = useProfile();
  useEffect(() => {
    getProfile()
  }, [])
  
  return (
    <div>
      <title>Profile</title>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Avatar>
            <AvatarImage src={profile.profile_img} />
            <AvatarFallback>{profile.name}</AvatarFallback>
          </Avatar>
          <h4>{profile.name}</h4>
          <div className="flex items-center">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode" className="ml-3">Airplane Mode</Label>
          </div>
        </CardContent>
        {/* <CardFooter className="border-t px-6 py-4">
        <Button>Save</Button>
      </CardFooter> */}
      </Card>
    </div>
  );
}

export default Setting;
