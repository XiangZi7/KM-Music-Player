import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    setPlaying,
    playNext,
    playPrevious,
    setLooping,
    setShuffling,
} from "@/stores/modules/playerStore";
import {httpGet} from '@/utils/http';
import {createBilingualData} from '@/utils/parseLyrics';
import {message} from 'antd';
import {RootState} from '@/stores'
import {LyricData} from "@/api/interface.ts";

interface LyricLine {
    time: number;
    text: string;
    translation: string;
}

interface Song {
    src: string;
    Lyric: number;
}

interface MusicPlayer {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    lyricList: LyricLine[];
    currentLine: number;
    lineHeights: number;
    song: Song;
    seek: (time: number) => void;
    handlePlayPauseClick: () => void;
    handlePrevClick: () => void;
    handleLoopClick: () => void;
    handleShuffleClick: () => void;
    handleNextClick: () => void;
    handleVolume: (volume: number) => void;
    volume: number;
}

const useMusicPlayer = (): MusicPlayer => {
    // 得到 Redux 中的数据
    const {
        songs,
        currentIndex,
        isLooping,
        isShuffling,
        isPlaying,
    } = useSelector((state: RootState) => state.player);
    const dispatch = useDispatch();
    const [audio] = useState(new Audio(songs[currentIndex].src));
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(70);
    // 歌词
    const [lyricList, setLyricList] = useState<LyricLine[]>([]);
    // 当前歌词
    const [currentLine, setCurrentLine] = useState<number>(-1);
    // 当前歌词高度
    const [lineHeights, setLineHeight] = useState<number>(144);
    // 初始化
    useEffect(() => {
        audio.addEventListener('ended', () => handleEnded());
        audio.addEventListener('timeupdate', () => handleTimeUpdate());
        audio.addEventListener('loadedmetadata', () => handleLoadedData());
        return () => {
            audio.removeEventListener('ended', () => handleEnded());
            audio.removeEventListener('timeupdate', () => handleTimeUpdate());
            audio.removeEventListener('loadedmetadata', () => handleLoadedData());
            dispatch(setPlaying(false))
        };
    }, [audio]);
    // 修改音乐地址
    useEffect(() => {
        audio.src = songs[currentIndex].src;
        setLyricList([]);
        httpGet<LyricData>('/lyric', {id: songs[currentIndex].id}).then((data) => {
            const bilingualData = createBilingualData(data.lrc?.lyric, data.tlyric?.lyric);
            setLyricList(bilingualData);
        });
    }, [currentIndex]);

    useEffect(() => {
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlaying, currentIndex]);

    useEffect(() => {
        watchSongLine();
    }, [currentTime])

    // 当前歌曲时间
    function handleTimeUpdate() {
        setCurrentTime(audio.currentTime || 0);
    }

    // 当前歌曲总时间
    function handleLoadedData() {
        setDuration(audio.duration || 0);
    }

    // 播放结束回调
    function handleEnded() {
        // 如果是循环
        if (isLooping) {
            audio.currentTime = 0;
            audio.play();
            dispatch(setPlaying(false));
        } else {
            handleNextClick();
        }
    }

    // 暂停\播放
    function handlePlayPauseClick() {
        dispatch(setPlaying(!isPlaying));
    }

    // 下一首
    function handleNextClick() {
        dispatch(playNext());
    }

    // 上一首
    function handlePrevClick() {
        dispatch(playPrevious());
    }

    // 循环播放
    function handleLoopClick() {
        message.success('循环播放')
        dispatch(setLooping(!isLooping));
    }

    // 随机播放
    function handleShuffleClick() {
        message.success('随机播放')
        dispatch(setShuffling(!isShuffling));
    }

    // 监听歌词当前时长
    function watchSongLine() {
        // 歌词时间
        if (!lyricList) return;
        for (let i = 0; i < lyricList.length; i++) {
            if (i === lyricList.length - 1 || currentTime < lyricList[i + 1].time) {
                setCurrentLine(i);
                break;
            }
        }

        if (lyricList.length > 0) {
            const lineHeight = 20; // 每行歌词的高度
            const translateY = (currentLine - 4) * -lineHeight; // 将当前行的上两行作为起始位置
            setLineHeight(translateY);
        }
    }

    const seek = (time: number) => {
        audio.currentTime = time;
    };
    const handleVolume = (volume: number) => {
        audio.volume = volume / 100;
        setVolume(volume)
    };

    return {
        isPlaying,
        currentTime,
        duration,
        lyricList,
        currentLine,
        lineHeights,
        song: songs[currentIndex],
        seek,
        handlePlayPauseClick,
        handlePrevClick,
        handleLoopClick,
        handleShuffleClick,
        handleNextClick,
        handleVolume,
        volume
    };
};

export default useMusicPlayer;
