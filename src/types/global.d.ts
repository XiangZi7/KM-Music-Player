export { }
declare let userId: string
declare global {
    type Rc<T, P> = Record<T, P>;

    type Lyric = {
        time: number,
        text: string
    };

    interface Bilingial extends Lyric {
        text?: string
        lrc: string
        tlyric: string
    }

    type Song = {
        id: string,
        title: string,
        singer: string
        album: string
        cover: string
        src?: string
        time: number
        mv: number|string
        lyric?: string

        // 要兼容用户等数据类型
        [property: string]: any
    }

    // 只列出重要的数据类型，太多了
    type Playlist = {
        id: number
        name: string
        copied: boolean
        coverImgId: number
        coverImgUrl: string
        createTime: number
        creator: UserProfile
        description: string
        tags: string[]
        userId: number
        tracks: any[]
        tracksId: any[]
        [property: string]: any
    }
    type Ip = {
        ip: unknown
        location: string
        userId: number
    }
    type UserComment = {
        commentId: number
        content: string
        time: number
        timeStr: string
        liked: boolean
        likedCount: number
        ipLocation: Ip
        owner: boolean
        uesr: UserProfile
        [property: string]: any
    }
    type Message = {
        id: number
        text: string
        timestamp: number
        sender: 'robot'|'me'
    }
    type Model = {
        value: string | number
        label: string | number
    }

    interface MusicPlayer {
        isPlaying: boolean // Ensure this property is of type boolean
        currentTime: number
        duration: number
        lyricList: Bilingial[]
        currentLine: number
        lineHeights: number
        volume: number
        song: Song
        seek?: (time: number) => any
        handlePlayPauseClick: () => any
        handlePrevClick: () => any
        handleNextClick: () => any
        handleLoopClick: () => any
        handleShuffleClick: () => any
        handleVolume?: (volume: number) => any
    }

    // 调用的是网易云接口，或只列关键字段
    interface UserProfile {
        avatarUrl: string
        nickname: string
        gender: number
        userId: number,

        [property: string]: any
    }

}

