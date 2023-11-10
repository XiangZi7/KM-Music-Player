export const formatTime = (time:string) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};
export const formatTimes = (songdt:string) => {
    let min = parseInt(songdt / 1000 / 60)
    let sec = parseInt((songdt / 1000) % 60)
    if (min < 10) {
        min = '0' + min
    }
    if (sec < 10) {
        sec = '0' + sec
    }
    return min + ":" + sec;
}

export function timestamp(timestamp:string) {
    const date = new Date(timestamp);
    const normalTime = date.toLocaleString(); // 使用 toLocaleString() 方法将时间转换为本地时间格式
    return normalTime
}