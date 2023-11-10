import { createContext } from 'react';

const MusicPlayerContext = createContext({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    lyricList: [],
    currentLine: -1,
    lineHeights: 0,
    volume:70,
    handlePlayPauseClick:() => {},
    handleNextClick:() => {},
    handlePrevClick:() => {},
    handleLoopClick:() => {},
    handleShuffleClick:() => {},
    handleVolume:() => {},
});

export default MusicPlayerContext;
