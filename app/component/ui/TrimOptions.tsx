import React from 'react'
import { AspectRatioSelector } from './DropDown';
import { formatSecondsToHHMMSS } from '@/app/lib/utils/handleTimeUnits';
import { Input } from './Input';
import { useTrimJobStore } from '@/app/contexts/jobIdContext';
import { useAspectRatioStore, useClippingWindowStore } from '@/app/contexts/videoContext';
import { trimmedVideoPathStore } from '@/app/contexts/pathContext';
import { TimePicker } from '@/components/ui/time-picker';
const TrimOptions = ({ duration }: { duration: number }) => {
    const { setTrimCompleted } = useTrimJobStore();
    const { setStartTime, startTime, endTime, setEndTime } = useClippingWindowStore();
    const { setTrimmedVideoPath } = trimmedVideoPathStore();
    const { aspectRatio, setAspectRatio } = useAspectRatioStore()
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium">Start Time</label>
                <TimePicker
                    value={startTime}
                    maxValue={formatSecondsToHHMMSS(duration)}
                    minValue='00:00:00'
                    onChange={(val) => {
                        setTrimCompleted(false); //startTime changed so wapas trim krna pdega
                        setStartTime(val);
                        setTrimmedVideoPath("");
                    }}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">End Time</label>
                <TimePicker
                    value={endTime}
                    maxValue={formatSecondsToHHMMSS(duration)}
                    minValue='00:00:15'
                    onChange={(val) => {
                        setEndTime(val)
                        setTrimCompleted(false); //endTime changed so wapas trim krna pdega
                        setTrimmedVideoPath("");
                    }}
                />
            </div>

            <AspectRatioSelector value={aspectRatio} />
        </div>
    )
}

export default TrimOptions
