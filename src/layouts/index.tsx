import Router from "@/routes/index";
import {httpGet} from "@/utils/http";
import {useEffect, useState} from 'react'
import Player from '@/components/player/player'
// 共享音乐播放器的状态
import MusicPlayerContext from '@/utils/PlayerContext'
import useMusicPlayer from '@/utils/usePlayerMusic'
import LeftSide from './components/left-side'
import {HashRouter} from 'react-router-dom';

export default function LayoutIndex() {
    const musicPlayer = useMusicPlayer();

    // const [userinfo, setUserInfo] = useState({})
    // useEffect(() => {
    //     httpGet("login/status").then(({data}) => {
    //         setUserInfo(data.profile)
    //     })
    // }, [])

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
                    <HashRouter>
                        <Router></Router>
                    </HashRouter>
                </div>
                <Player/>
            </div>
            <div className="overlay-app"></div>
        </MusicPlayerContext.Provider>
    )
}