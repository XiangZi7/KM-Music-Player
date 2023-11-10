import './style.scss'
import {ConfigProvider, Slider, Spin} from "antd";
import {PauseCircle, PlayCircle, Repeat, Shuffle, SkipBack, SkipForward} from "react-feather";
import {useContext} from "react";
import MusicPlayerContext from "@/utils/PlayerContext";
import {formatTime} from "@/utils/FormatTime.js";

export default function miniPlayer() {

    const {
        isPlaying,
        duration,
        currentTime,
        song,
        handlePlayPauseClick,
        seek,
        handleLoopClick,
        handlePrevClick,
        handleNextClick,
        handleShuffleClick,
        lyricList,
        currentLine,
        lineHeights
    } = useContext(MusicPlayerContext)

    function SliderChange(e: number) {
        seek(e)
    }

    return (
        <div className="minibox">
            <div className="mini-player">
                <div className="wrap">
                    <div className="grid">
                        {/*封面*/}
                        <div className="cover">
                            <div className="images">
                                <img src={song.cover}
                                     alt=""/>
                            </div>
                        </div>
                        {/*控制器*/}
                        <div className="controller">
                            <div className="title">
                                <div className="flex flex-col gap-0">
                                    <p className="font-semibold text-foreground/90">{song.title}</p>
                                    <p className="text-sm text-foreground/80">{song.album}</p>
                                    <p className="text-lg font-medium mt-2">{song.singer}</p>
                                </div>
                            </div>
                            {/*进度条*/}
                            <div className="Progress">
                                <div className="w-full px-10">
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Slider: {
                                                    trackBg: "#000",
                                                    trackHoverBg: "#000",
                                                },
                                            },
                                        }}
                                    >
                                        <Slider value={currentTime}
                                                onChange={SliderChange} max={duration}
                                                disabled={false}/>
                                    </ConfigProvider>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm">{formatTime(currentTime)}</p>
                                    <p className="text-sm text-foreground/50">{formatTime(duration)}</p>
                                </div>
                            </div>
                            {/*控制器 - 按钮*/}
                            <div className="con-btn">
                                <Shuffle size={28} onClick={handleShuffleClick}/>
                                <SkipBack size={28} onClick={handlePrevClick}/>
                                <div onClick={handlePlayPauseClick}>
                                    {isPlaying ? <PauseCircle size={45}/> :
                                        <PlayCircle size={45}/>}
                                </div>
                                <SkipForward size={28} onClick={handleNextClick}/>
                                <Repeat size={28} onClick={handleLoopClick}/>
                            </div>
                        </div>
                    </div>
                    {/*歌词*/}
                    {/*<div className="lyrics-container">*/}
                    {/*    {lyricList.length > 0 ?*/}
                    {/*        <ul className="w-full" style={{transform: `translateY(${lineHeights}px)`}}>*/}
                    {/*            {lyricList.map((item, idx) => (*/}
                    {/*                <li className={`text-sm text-center py-1 ${idx === currentLine ? 'active text-lg font-semibold text-foreground/100  transition-all py-1.5' : 'text-foreground/60'}`}*/}
                    {/*                    key={item.time}*/}
                    {/*                >*/}
                    {/*                    <p>{item.lrc}</p>*/}
                    {/*                    <p>{item.tlyric}</p>*/}
                    {/*                </li>*/}
                    {/*            ))}*/}
                    {/*        </ul> : <Spin className="flex item-center h-full"/>}*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}