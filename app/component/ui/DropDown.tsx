"use client";

import { useAspectRatioStore } from "@/app/contexts/videoContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AspectRatioOption, AspectRatioSelectorProps } from "@/types/video";


export const AspectRatioSelector = ({ value }: AspectRatioSelectorProps) => {

  const { setAspectRatio } = useAspectRatioStore()
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Aspect Ratio</label>
      <Select value={value} onValueChange={(val) => {
        console.log("Selected aspect ratio:", val);
        setAspectRatio(val as AspectRatioOption);
      }}>

        <SelectTrigger className="bg-background/50">
          <SelectValue placeholder="Select aspect ratio" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fullscreen">Fullscreen (16:9)</SelectItem>
          <SelectItem value="reels">Reels (9:16)</SelectItem>
          <SelectItem value="squared">Squared (1:1)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};