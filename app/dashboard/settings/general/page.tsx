"use client"
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

function Setting() {
  const supabase = createClient();
  const {data} = supabase.storage.from('sh-bucket').getPublicUrl('ca8b6696-3fe0-4131-8aaf-6c54f87ef8ee/sh.png')
  console.log(data.publicUrl)
  return (
    <div>
      <title>General</title>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode" className="ml-3">Airplane Mode</Label>
          </div>
          <Image src={data.publicUrl} width="250" height="250" alt="logo" priority/>
        </CardContent>
        {/* <CardFooter className="border-t px-6 py-4">
        <Button>Save</Button>
      </CardFooter> */}
      {/* <iframe src="https://chatbolt.ai/iframe/c8c7be04-7c04-447f-81fc-d1422c67b5ab" width="100%" height="800" frameBorder="0" ></iframe> */}
      </Card>
    </div>
  );
}

export default Setting;
