"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { extractVideoId } from "@/app/lib/utils/extractVideoId";
import { useVideoIDStore, useYoutubeURLStore } from "../contexts/videoContext";
import { useCombineJobStore, useDownloadJobStore, useTrimJobStore } from "../contexts/jobIdContext";
import { combinedVideoPathStore, trimmedVideoPathStore } from "../contexts/pathContext";


interface VideoInputProps {
  onVideoSubmit: (youtubeVideoURL: string, videoId: string) => void;
}

export const VideoInput = ({ onVideoSubmit }: VideoInputProps) => {

  const { youtubeVideoURL, setYoutubeVideoURL } = useYoutubeURLStore();
  const { setDownloadCompleted } = useDownloadJobStore();
  const { setCombineCompleted } = useCombineJobStore();
  const { setTrimCompleted } = useTrimJobStore();
  const { setTrimmedVideoPath } = trimmedVideoPathStore();
  const { setCombinedVideoPath } = combinedVideoPathStore();
  const { setVideoID } = useVideoIDStore();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setButtonDisable(false);
    setError("");
  }, [youtubeVideoURL]);

  const handleSubmit = () => {
    const videoId = extractVideoId(youtubeVideoURL);
    setVideoID(videoId); //Video id for lter user
    if (videoId) {
      setError("");
      setButtonDisable(true);
      onVideoSubmit(youtubeVideoURL, videoId);
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
          onChange={(e) => {
            //whenever the download link changes downloadVideoCompleted becomes false
            setDownloadCompleted(false); //Url changed so we have to download the new video again
            setCombineCompleted(false);
            setTrimCompleted(false);
            setYoutubeVideoURL(e.target.value);
            setTrimmedVideoPath("");
            setCombinedVideoPath("");
          }}
          className="bg-background/50"
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={buttonDisable}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};