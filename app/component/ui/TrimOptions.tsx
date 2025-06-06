import React from 'react'
import { AspectRatioSelector } from './DropDown';
import { formatSecondsToHHMMSS } from '@/app/lib/utils/handleTimeUnits';
import { Input } from './Input';
import { useTrimJobStore } from '@/app/contexts/jobIdContext';
import { useAspectRatioStore, useClippingWindowStore } from '@/app/contexts/videoContext';
import { trimmedVideoPathStore } from '@/app/contexts/pathContext';

const TrimOptions = ({ duration }: { duration: number }) => {
    const { setTrimCompleted } = useTrimJobStore();
    const { setStartTime, startTime, endTime, setEndTime } = useClippingWindowStore();
    const { setTrimmedVideoPath } = trimmedVideoPathStore();
    const { aspectRatio, setAspectRatio } = useAspectRatioStore()
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium">Start Time</label>
                <Input
                    type="time"
                    step="1"
                    value={startTime}
                    onChange={(e) => {
                        setTrimCompleted(false); //startTime changed so wapas trim krna pdega
                        setStartTime(e.target.value);
                        setTrimmedVideoPath("");
                    }}
                    min="00:00:00"
                    max={formatSecondsToHHMMSS(duration)}
                    className="bg-background/50"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">End Time</label>
                <Input
                    type="time"
                    step="1"
                    value={endTime}
                    onChange={(e) => {
                        setEndTime(e.target.value)
                        setTrimCompleted(false); //endTime changed so wapas trim krna pdega
                        setTrimmedVideoPath("");
                    }}
                    min="00:00:00"
                    max={formatSecondsToHHMMSS(duration)}
                    className="bg-background/50"
                />
            </div>

            <AspectRatioSelector value={aspectRatio} />
        </div>
    )
}

export default TrimOptions
