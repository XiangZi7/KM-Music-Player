import Router from "@/routes/index";
import Player from '@/components/player/player'
// 共享音乐播放器的状态
import MusicPlayerContext from '@/utils/PlayerContext'
import useMusicPlayer from '@/utils/usePlayerMusic'
import LeftSide from './components/left-side'

export default function LayoutIndex() {
    const musicPlayer = useMusicPlayer();

    return (
        <MusicPlayerContext.Provider value={musicPlayer}>
            <div className="video-bg">
                <video width="320" height="240" autoPlay loop muted>
                    <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4"/>
                </video>
            </div>
            <div className="app">
                <div className="wrapper">
                    {/*Side*/}
                    <LeftSide/>

                    {/*Main*/}
                    <div className="flex flex-col app-main">
                        <Router></Router>
                    </div>
                </div>
                <Player/>
            </div>
            <div className="overlay-app"></div>
        </MusicPlayerContext.Provider>
    )
}