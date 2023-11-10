import {createContext} from 'react';
import {LyricLine, Song} from "@/stores/interface";

type MusicPlayer = {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    lyricList: LyricLine[];
    currentLine: number;
    lineHeights: number;
    volume: number;
    song: Song
    handlePlayPauseClick: () => void;
    handleNextClick: () => void;
    handlePrevClick: () => void;
    handleLoopClick: () => void;
    handleShuffleClick: () => void;
    handleVolume: () => void;
    seek: (e: number) => void; // 添加 seek 方法
};

const MusicPlayerContext = createContext<MusicPlayer>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    lyricList: [],
    currentLine: -1,
    lineHeights: 0,
    volume: 70,
    song: {
        id: '',
        title: '',
        singer: '',
        album: '',
        cover: '',
        src: '',
        time: 0,
        mv: '',
        Lyric: ''
    },
    seek: () => {
    },
    handlePlayPauseClick: () => {
    },
    handleNextClick: () => {
    },
    handlePrevClick: () => {
    },
    handleLoopClick: () => {
    },
    handleShuffleClick: () => {
    },
    handleVolume: () => {
    },
});

export default MusicPlayerContext;
