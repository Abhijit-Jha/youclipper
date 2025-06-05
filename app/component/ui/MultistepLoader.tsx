import { useStepsStore } from '@/app/contexts/extra';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import React from 'react';

const MultistepLoader = () => {
  const { stepNo } = useStepsStore();

  const loadingStates = [
    { text: "Preparing everything for you..." },
    { text: "Downloading high-quality video and audio 🎥🔊" },
    { text: "Merging audio and video into one seamless file 🎬" },
    { text: "Trimming the video to your selected timeframe ✂️" },
    { text: "Optimizing video resolution for the best performance ⚙️" },
    { text: "Finalizing everything — hang tight ⏳" },
    { text: "All set! Your download will begin shortly ⬇️" },
  ];

  return (
    <div className="flex items-center justify-center">
      <MultiStepLoader loadingStates={loadingStates} loading={true} step={stepNo} />
    </div>
  );
};

export default MultistepLoader;
