"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/app/hooks/useSettings";
import { toast } from "sonner";
function Setting() {
  const { settings, getSettings, updateSettings } = useSettings();
  const [tinNumber, setTinNumber] = useState(() => settings?.tin_number || "");

  useEffect(() => {
    getSettings();
  }, []);

  useEffect(() => {
    if (settings?.tin_number) {
      setTinNumber(settings.tin_number);
    }
  }, [settings]);

  const updateTinNumber = async () => {
    updateSettings(tinNumber).then((result: any) => {
      if (result.success) {
        toast.success(`Tin Number has been updated successfully!`);
      }
    });
  };
  return (
    <div>
      <title>General</title>
      <Card x-chunk="dashboard-04-chunk-1" className="mb-3">
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode" className="ml-3">
              Airplane Mode
            </Label>
          </div>
        </CardContent>
        {/* <CardFooter className="border-t px-6 py-4">
        <Button>Save</Button>
      </CardFooter> */}
        {/* <iframe src="https://chatbolt.ai/iframe/c8c7be04-7c04-447f-81fc-d1422c67b5ab" width="100%" height="800" frameBorder="0" ></iframe> */}
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tax Identification Number (TIN)</CardTitle>
          <CardDescription className="text-sm text-davy-gray">
            A Tax Identification Number (TIN) is a unique number issued by the
            General Department of Taxation (GDT) to registered taxpayers in
            Cambodia. The general TIN of tax registered entities in Cambodia is
            as follows (X represents numerical digits): <br />
            Large taxpayers: L00X-XXXXXXXXX <br />
            Medium taxpayers: K00X-XXXXXXXXX <br />
            Small taxpayers: E00X-XXXXXXXXXX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <Input
              placeholder="Project Name"
              defaultValue={tinNumber}
              onChange={(e: any) => setTinNumber(e.target.value)}
            />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="gooeyLeft" onClick={() => updateTinNumber()}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Setting;
