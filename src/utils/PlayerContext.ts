/**
 * 播放器上下文
 */

import { createContext } from "react";

const MusicPlayer:MusicPlayer = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    lyricList: [] as Bilingial[],
    currentLine: -1,
    lineHeights: 0,
    volume: 70,
    song: {} as Song,
    seek: () => { },
    handlePlayPauseClick: () => { },
    handlePrevClick: () => { },
    handleNextClick: () => { },
    handleLoopClick: () => { },
    handleShuffleClick: () => { },
    handleVolume: () => { },
}

const MusicPlayerContext = createContext({
    ...MusicPlayer
});

export default MusicPlayerContext;

