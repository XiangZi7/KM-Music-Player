import { defineStore, createPinia } from "pinia";

// PlayerStore
import { getImageThemeColor } from "@/src/utils/ThemeColor";
export const PlayerStore = defineStore({
    id: "PlayerState",
    state: () => ({
        count: 0,
        // 歌曲缓存
        songs: [
            { id: "27591651", title: 'Intro AE 86', singer: "陈光荣", album: "頭文字[イニシャル]D THE MOVIE SOUND TUNE", cover: "http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg", src: 'http://music.163.com/song/media/outer/url?id=27591651.mp3', time: 149000, mv: "", Lyric: "" },
            { id: "409872504", title: 'Ninelie', singer: "Aimer", album: "ninelie EP", cover: "http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg", src: 'http://music.163.com/song/media/outer/url?id=409872504.mp3', time: 260675, mv: "", Lyric: "" },
            { id: "4098725042", title: '无穷', singer: "per se", album: "无穷", cover: "https://p2.music.126.net/V08nc-ELfydt4e7953pL8A==/109951165007678317.jpg", src: 'http://m7.music.126.net/20230727161323/c9ac013008de0658e02767499431add5/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/14056566001/4563/1aff/fbbb/323350edbd48b859d6387a780dfb4d5d.mp3', time: 260675, mv: "", Lyric: "" },
        ],
        // 当前播放的歌曲位置
        currentIndex: 0,
        // 播放器
        player: uni.createInnerAudioContext(),
        // 播放状态
        isPlaying: false,
        // 封面动画状态
        animationPlayState: "paused",
        currentLyricIndex: -1, // 当前高亮显示的歌词索引
    }),

    actions: {
        updateSongs(param) {
            this.songs[this.currentIndex] = Object.assign(this.songs[this.currentIndex], { ...param })
        },
    },
    // 开启数据缓存
    //   persist: {
    //     enabled: true,
    //     strategies: [
    //       {
    //         paths: [],
    //         storage: localStorage,
    //       },
    //     ],
    //   },
});
// piniaPersist(持久化)
// const pinia = createPinia();
// pinia.use(piniaPluginPersist);