"use client";

import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";


interface VideoInputProps {
  onVideoSubmit: (videoId: string) => void;
}

export const VideoInput = ({ onVideoSubmit }: VideoInputProps) => {
  const [youtubeVideoURL, setYoutubeVideoURL] = useState("");
  const [error, setError] = useState("");

  const extractVideoId = (input: string): string | null => {
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = input.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = () => {
    const videoId = extractVideoId(youtubeVideoURL);
    if (videoId) {
      setError("");
      onVideoSubmit(videoId);
    } else {
      setError("❌ Invalid YouTube URL or Video ID");
    }
  };

  return (
    <div className="glass-card p-8 max-w-2xl w-full mx-auto space-y-4 ">
      <h2 className="text-2xl font-bold mb-6">Enter YouTube Video URL</h2>
      <div className="space-y-4">
        <Input
          placeholder="Paste YouTube URL or video ID"
          value={youtubeVideoURL}
          onChange={(e) => setYoutubeVideoURL(e.target.value)}
          className="bg-background/50"
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
        <Button
          onClick={handleSubmit}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};