"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type AspectRatioOption = "fullscreen" | "reels" | "squared";

interface AspectRatioSelectorProps {
  value: AspectRatioOption;
  onChange: (value: AspectRatioOption) => void;
}

export const AspectRatioSelector = ({ value, onChange }: AspectRatioSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Aspect Ratio</label>
      <Select value={value} onValueChange={(val) => onChange(val as AspectRatioOption)}>
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