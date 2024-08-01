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
  const [exchangeRate, setExchangeRate] = useState(() => settings?.exchange_rate || "");
  useEffect(() => {
    getSettings();
  }, []);
  
  useEffect(() => {
    if (settings?.tin_number) {
      setTinNumber(settings.tin_number);
    }
    if(settings?.exchange_rate) {
      setExchangeRate(settings.exchange_rate);
    }
  }, [settings]);
  const update = async () => {
    updateSettings(tinNumber, exchangeRate).then((result: any) => {
      if (result.success) {
        toast.success(`Setting has been updated successfully!`);
      }
    });
  };
  return (
    <div>
      <title>General</title>
      
      <Card x-chunk="dashboard-04-chunk-1" className="">
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
          <div className="my-5">
            <Label htmlFor="exchangeRate" className="font-bold">
              Exchange Rate (៛)
            </Label>
            <Input
                id="exchangeRate"
                placeholder="Exchange Rate"
                defaultValue={exchangeRate}
                onChange={(e: any) => setExchangeRate(e.target.value)}
              />
          </div>
          <div className="my-5">
            <h4 className="font-bold">Tax Identification Number (TIN)</h4>
            <p className="text-sm text-davy-gray"> A Tax Identification Number (TIN) is a unique number issued by the
            General Department of Taxation (GDT) to registered taxpayers in
            Cambodia. The general TIN of tax registered entities in Cambodia is
            as follows (X represents numerical digits): <br />
            Large taxpayers: L00X-XXXXXXXXX <br />
            Medium taxpayers: K00X-XXXXXXXXX <br />
            Small taxpayers: E00X-XXXXXXXXXX</p>
            <Input
              className="mt-5"
              placeholder="TIN Number"
              defaultValue={tinNumber}
              onChange={(e: any) => setTinNumber(e.target.value)}
            />
          </div>  
          <Button variant="gooeyLeft" className="mt-5" onClick={() => update()}>Save</Button>
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
