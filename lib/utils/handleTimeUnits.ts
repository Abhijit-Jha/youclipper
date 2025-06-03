export const parseISODurationToSeconds = (isoDuration: string): number => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = isoDuration.match(regex);

    if (!matches) return 0;

    const hours = parseInt(matches[1] || "0", 10);
    const minutes = parseInt(matches[2] || "0", 10);
    const seconds = parseInt(matches[3] || "0", 10);

    return hours * 3600 + minutes * 60 + seconds;
};

export const formatSecondsToHHMMSS = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const paddedHours = String(hours).padStart(2, "0");
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

export function convertHHMMSSToSeconds(timeStr: string): number {
    const [hh, mm, ss] = timeStr.split(':').map(Number);
    return hh * 3600 + mm * 60 + ss;
  }
  