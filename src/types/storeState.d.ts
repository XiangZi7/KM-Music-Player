/**
 *  state type 
 */
export {}
declare global {
    interface StateStore {
        player: PlayerStore
    }
    interface PlayerStore {
        currentTime: number
        duration: number,
        count: number,
        // 歌曲
        songs: Song[]
        // 历史记录
        historcontent: string[],
        // 当前音乐播放下标
        currentIndex: number,
        // 播放状态
        isPlaying: boolean,
        // 封面动画状态
        animationPlayState: string,
        // 当前高亮显示Index
        currentLyricIndex: number,
        // 循环播放
        isLooping: boolean,
        // 随机播放
        isShuffling: boolean,
    }
}
