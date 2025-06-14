import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';
import { cn } from '@/app/lib/utils';

function pad(n: number) {
    return n.toString().padStart(2, '0');
}

function clampTime(value: string, min: string, max: string): string {
    const toSeconds = (t: string) => {
        const [h, m, s] = t.split(':').map(Number);
        return h * 3600 + m * 60 + s;
    };
    const valSec = toSeconds(value);
    const minSec = toSeconds(min);
    const maxSec = toSeconds(max);

    if (valSec < minSec) return min;
    if (valSec > maxSec) return max;
    return value;
}

interface TimePickerProps {
    value: string; // "HH:MM:SS"
    maxValue: string; // "HH:MM:SS"
    minValue: string; // "HH:MM:SS"
    onChange: (val: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, maxValue, minValue, onChange }) => {
    const [hours, minutes, seconds] = value.split(':');

    const hourRef = useRef<HTMLInputElement>(null);
    const minuteRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);

    const updateTime = (h: string, m: string, s: string) => {
        const time = `${pad(+h)}:${pad(+m)}:${pad(+s)}`;
        onChange(clampTime(time, minValue, maxValue));
    };

    return (
        <div className="flex items-center gap-2">
            <Clock className="h-4 w-10 text-muted-foreground" />
            <Input
                ref={hourRef}
                type="number"
                min={0}
                max={23}
                className={cn('w-[52px] text-center no-spinner')}
                value={hours}
                onChange={(e) => updateTime(e.target.value, minutes, seconds)}
            />
            :
            <Input
                ref={minuteRef}
                type="number"
                min={0}
                max={59}
                className={cn('w-[52px] text-center no-spinner')}
                value={minutes}
                onChange={(e) => updateTime(hours, e.target.value, seconds)}
            />
            :
            <Input
                ref={secondRef}
                type="number"
                min={0}
                max={59}
                className={cn('w-[52px] text-center no-spinner')}
                value={seconds}
                onChange={(e) => updateTime(hours, minutes, e.target.value)}
            />
        </div>
    );
};
