/**
 * 播放器hooks
*/
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from 'antd';
import {
    setPlaying,
    playNext,
    playPrevious,
    setLooping,
    setShuffling

} from '@/stores/modules/playerStore'
// import { MusicPlayerType } from "./PlayerContext"; 
import { songsAPI } from "@/api";
import { createBilingualData } from '@/utils/parseLyrics';

const useMusicPlayer = (): MusicPlayer => {
    const {
        songs,          /* 音乐 */
        currentIndex,   /* 当前下标 */
        isLooping,      /* 歌曲循环 */
        isShuffling,    /* 歌曲循环 */
        isPlaying,      /* 播放 */
    } = useSelector<StateStore, PlayerStore>((state) => state.player);
    // redux 分发
    const dispatch = useDispatch();
    // 播放器
    const [audio] = useState(new Audio(songs[currentIndex].src));
    // 当前时刻
    const [currentTime, setCurrentTime] = useState(0);
    // 播放时长
    const [duration, setDuration] = useState(0);
    // 音量
    const [volume, setVolume] = useState(70);
    // 歌词
    const [lyricList, setLyricList] = useState<Bilingial[]>([]);
    // 当前歌词
    const [currentLine, setCurrentLine] = useState(-1);
    // 歌词高度
    const [lineHeights, setLineHeight] = useState(144);

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
        }
    }, [audio])
    // 修改音乐地址
    useEffect(() => {
        audio.src = songs[currentIndex].src!;
        setLyricList([]);
        // getapi
        songsAPI.getSong({ id: songs[currentIndex].id })
            .then(({ data }) => {
                const bilingualData /* bilingual 双语 */ = createBilingualData(data.lrc?.lyric, data.tlyric?.lyric);
                setLyricList(bilingualData);
            });
    }, [currentIndex]);
    // 播放
    useEffect(() => {
        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPlaying, currentIndex]);
    // 歌词
    useEffect(() => {
        watchSongLine();
    }, [currentTime]);

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
        if (isLooping) {
            audio.currentTime = 0;
            audio.play();
            dispatch(setPlaying(false));
        } else {
            handleNextClick();
        }
    }
    // 播放暂停
    function handlePlayPauseClick() {
        dispatch(setPlaying(!isPlaying));
    }
    // 下首
    function handleNextClick() {
        dispatch(playNext());
    }
    // 上首
    function handlePrevClick() {
        dispatch(playPrevious());
    }
    // 循环播放
    function handleLoopClick() {
        message.success('循环播放');
        dispatch(setLooping(!isLooping));
    }
    // 随机播放
    function handleShuffleClick() {
        message.success('随机播放');
        dispatch(setShuffling(!isShuffling));
    }
    // 监听歌词当前时长
    function watchSongLine() {
        // 歌词时间
        if (!lyricList) { return; }
        for (let i = 0; i < lyricList.length; i++) {
            // 最后一行 | 每行所在时间
            if (i === lyricList.length - 1 || currentTime < lyricList[i + 1].time) {
                setCurrentLine(i);
                break;
            }
        }
        // 歌词拉起
        if (lyricList.length > 0) {
            const lineHeights = 20;
            const translateY = (currentLine - 4) * (-lineHeights);
            setLineHeight(translateY);
        }
    }

    const seek = (time: number) => {
        audio.currentTime = time;
    }
    const handleVolume = (volume: number) => {
        audio.volume = volume / 100;
        setVolume(volume);
    }

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
    }
}
export default useMusicPlayer;
