export const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

export const formatTimes = (songdt: number) => {
    const minutes = Math.floor((songdt / 1000) / 60).toString().padStart(2, '0');
    const seconds = Math.floor((songdt / 1000) % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

export function timestamp(timestamp: number | string) {
    const date = new Date(timestamp);
    const normalTime = date.toLocaleString();
    return normalTime;
}
