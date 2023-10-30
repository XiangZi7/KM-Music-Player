import {createSlice} from "@reduxjs/toolkit";

const playerStore = createSlice({
    name: "player",
    // 初始化 state
    initialState: {
        // 播放器
        currentTime: 0,
        duration: 0,
        count: 0,
        // 歌曲
        songs: [{
            id: "27591651",
            title: 'Intro AE 86',
            singer: "陈光荣",
            album: "頭文字[イニシャル]D THE MOVIE SOUND TUNE",
            cover: "http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg",
            src: 'http://music.163.com/song/media/outer/url?id=27591651.mp3',
            time: 149000,
            mv: "",
            Lyric: "27591651"
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
                Lyric: "409872504"
            },
        ],
        // 历史搜索
        historcontent: [],
        // 当前播放的歌曲位置
        currentIndex: 0,
        // 播放状态
        isPlaying: false,
        // 封面动画状态
        animationPlayState: "paused",
        // 当前高亮显示的歌词索引
        currentLyricIndex: -1,
        // 循环播放
        isLooping: false,
        // 随机播放
        isShuffling: false,
    },
    // 修改状态的方法 同步方法，可以直接修改值
    reducers: {
        updateSongs(state, param) {
            state.songs[state.currentIndex] = Object.assign(state.songs[state.currentIndex], {...param})
        },
        // 当前播放的歌曲
        setCurrentIndex(state, idx) {
            state.currentIndex = idx.payload
        },
        // 添加歌曲
        addSongs(state, arr) {
            let idx = state.songs.length - 1
            state.songs = state.songs.concat(arr.payload);
            state.currentIndex = idx + 1
        },
        // 播放
        setPlaying: (state, val) => {
            state.isPlaying = val.payload;
        },
        // 循环
        setLooping: (state, val) => {
            state.isLooping = val.payload;
        },
        // 随机
        setShuffling: (state, val) => {
            state.isShuffling = val.payload;
        },
        // 下一首
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
        // 上一首
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

    },
});

// 解构出来 actionCreater函数
const {
    updateSongs,
    setCurrentIndex,
    addSongs,
    setPlaying,
    playNext,
    playPrevious,
    setLooping,
    setShuffling,
} = playerStore.actions;
// 获取 reducer
// 用于定义如何更新应用的状态。它接收两个参数：当前的状态（state）和即将执行的 action，并返回一个新的状态。
const reducer = playerStore.reducer;

// 按需导出
export {
    updateSongs,
    setCurrentIndex,
    addSongs,
    setPlaying,
    playNext,
    playPrevious,
    setLooping,
    setShuffling,
};
// 默认导出
export default reducer;

