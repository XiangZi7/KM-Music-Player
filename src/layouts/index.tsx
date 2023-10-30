import Router from "@/routes/index";
import {httpGet} from "@/utils/http";
import {useEffect, useState} from 'react'
import {StepBackwardOutlined, PlayCircleOutlined, StepForwardOutlined, PauseCircleOutlined} from '@ant-design/icons';
// 共享音乐播放器的状态
import MusicPlayerContext from '@/utils/PlayerContext'
import useMusicPlayer from '@/utils/usePlayerMusic'
import LeftSide from './components/left-side'
import {HashRouter} from 'react-router-dom';
import {Avatar, Slider} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {PiShuffleAngularBold} from "react-icons/pi";
import {MdSkipPrevious} from "react-icons/md";
import {AiOutlinePauseCircle, AiOutlinePlayCircle} from "react-icons/ai";
import {BiSkipNext} from "react-icons/bi";
import {ImLoop} from "react-icons/im";

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
                <div className="mk-box">
                    <div className="song-info">
                        <div className="flex">
                            <Avatar shape="square" size={64} icon={<UserOutlined/>}/>
                            <div className="flex flex-col justify-center flex-1  ml-5">
                                <div className="title">我是标题</div>
                                <div className="des">我是副标题</div>
                            </div>
                        </div>
                    </div>
                    <div className="player-control">
                        <div className="player_left">我是歌词</div>
                        <div className="player_center">
                            <div className="player_btn">
                                <PiShuffleAngularBold />
                                <StepBackwardOutlined/>
                                <PlayCircleOutlined/>
                                <PauseCircleOutlined/>
                                <StepForwardOutlined/>
                                <ImLoop size={1}/>
                            </div>
                            <div className="player_slider">
                                <Slider defaultValue={30} disabled={false}/>
                            </div>
                        </div>
                        <div className="player_right">音量</div>
                    </div>
                </div>
            </div>
            <div className="overlay-app"></div>
        </MusicPlayerContext.Provider>
    )
}