import { createSlice } from "@reduxjs/toolkit";

const initialState: PlayerStore = {
    currentTime: 0,
    duration: 0,
    count: 0,
    // 歌曲
    songs: [
        {
            id: "27591651",
            title: 'Intro AE 86',
            singer: "陈光荣",
            album: "頭文字[イニシャル]D THE MOVIE SOUND TUNE",
            cover: "http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg",
            src: 'http://music.163.com/song/media/outer/url?id=27591651.mp3',
            time: 149000,
            mv: "",
        },
        {
            id: "409872504",
            title: 'Ninelie',
            singer: "Aimer",
            album: "ninelie EP",
            cover: "http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg",
            src: 'http://music.163.com/song/media/outer/url?id=409872504.mp3',
            time: 260675,
            mv: "",
        }
    ],
    // 历史记录
    historcontent: [],
    // 当前音乐播放下标
    currentIndex: 0,
    // 播放状态
    isPlaying: false,
    // 封面动画状态
    animationPlayState: "pause",
    // 当前高亮显示Index
    currentLyricIndex: -1,
    // 循环播放
    isLooping: false,
    // 随机播放
    isShuffling: false,
}


const playStore = createSlice({
    name: "player",
    initialState,
    reducers: {
        updateSongs(state, param) {
            state.songs[state.currentLyricIndex] = Object.assign(state.songs[state.currentIndex], { ...param });
        },
        setCurrentIndex(state, idx) {
            state.currentIndex = idx.payload;
        },
        addSongs(state, arr) {
            const idx = state.songs.length - 1;
            state.songs = state.songs.concat(arr.payload);
            state.currentIndex = idx + 1;
        },
        setPlaying: (state, val) => {
            state.isPlaying = val.payload;
        },
        setLooping: (state, val) => {
            state.isLooping = val.payload;
        },
        setShuffling: (state, val) => {
            state.isShuffling = val.payload;
        },
        playNext: (state) => {
            if (state.isShuffling) {
                let randomIndex = state.currentIndex;
                while (randomIndex === state.currentIndex) {
                    randomIndex = Math.floor(Math.random() * state.songs.length);
                }
                state.currentIndex = randomIndex;
            } else {
                state.currentIndex = (state.currentIndex + 1) % state.songs.length;
            }
            state.isPlaying = true;
        },
        playPrevious: (state) => {
            if (state.isShuffling) {
                let randomIndex = state.currentIndex;
                while (randomIndex === state.currentIndex) {
                    randomIndex = Math.floor(Math.random() * state.songs.length);
                }
                state.currentIndex = randomIndex;
            } else {
                state.currentIndex = (state.currentIndex - 1 + state.songs.length) % state.songs.length;
            }
            state.isPlaying = true;
        },

    }
})

const {
    updateSongs,
    setCurrentIndex,
    addSongs,
    setPlaying,
    playNext,
    playPrevious,
    setLooping,
    setShuffling,
} = playStore.actions;
const reducer = playStore.reducer;

type PlayerState = ReturnType<() => typeof playStore>;
// actions导出
export {
    updateSongs,
    setCurrentIndex,
    addSongs,
    setPlaying,
    playNext,
    playPrevious,
    setLooping,
    setShuffling,
}
// reducer导出
export default reducer;
export type { PlayerState }