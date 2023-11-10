export interface Song {
    id: string;
    title: string;
    singer: string;
    album: string;
    cover: string;
    src: string;
    time: [number,string];
    mv: [number,string];
    Lyric: string;
}

export interface PlayerState {
    currentTime: number;
    duration: number;
    count: number;
    songs: Song[];
    historcontent: string[];
    currentIndex: number;
    isPlaying: boolean;
    animationPlayState: string;
    currentLyricIndex: number;
    isLooping: boolean;
    isShuffling: boolean;
}
export interface LyricLine{
    time: number;
    text: string;
}