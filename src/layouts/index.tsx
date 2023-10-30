import CnavBar from './components/navbar.jsx'
import Sidebar from './components/sidebar.jsx'
import Router from "@/routes/index";
import Mp from '@/components/mp'
import './index.scss'
import {httpGet} from "@/utils/http.ts";

import {useEffect,useState} from 'react'
// 共享音乐播放器的状态
import MusicPlayerContext from '@/utils/PlayerContext'
import useMusicPlayer from '@/utils/usePlayerMusic.jsx'

export default function LayoutIndex() {
    const musicPlayer = useMusicPlayer();

    const [userinfo, setUserInfo] = useState({})
    useEffect(() => {
        httpGet("login/status").then(({data}) => {
            setUserInfo(data.profile)
        })
    }, [])

    return (
        <MusicPlayerContext.Provider value={musicPlayer}>
            <div className="video-bg">
                <video width="320" height="240" autoPlay loop muted>
                    <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4"/>
                </video>
            </div>
            <div className="HeaderBar">
                <CnavBar userinfo={userinfo}/>
            </div>
            <div className="app-content flex h-[80vh]">
                <div className="app-sidebar flex px-4 py-8 flex-col items-center">
                    <Sidebar/>
                </div>
                <div className="flex-1 px-5 py-5 bg-[#00000066] rounded-2xl backdrop-blur shadow-lg mr-3 ">
                    <Router/>
                </div>
            </div>
            <Mp></Mp>
            <div className="w-full h-[50px]"></div>
        </MusicPlayerContext.Provider>
    )
}